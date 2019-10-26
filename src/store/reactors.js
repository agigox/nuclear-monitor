import { values, indexBy, prop, sortBy } from 'ramda';

import { getReactors } from '../api';

import { productionSelector } from './productions';
import { unavalabilitySelector } from './unavailabilities';

export const REACTORS_LOAD_ACTION = 'REACTORS_LOAD_ACTION';
export const REACTORS_RECEIVE_ACTION = 'REACTORS_RECEIVE_ACTION';

function loadReactorsAction() {
  return { type: REACTORS_LOAD_ACTION };
}

function receiveReactorsAction({ data, errors }) {
  return { type: REACTORS_RECEIVE_ACTION, data, errors };
}

export function loadAllReactors() {
  return function dispatchLoadAllReactors(dispatch) {
    dispatch(loadReactorsAction());
    return getReactors()
      .then(data =>
        dispatch(
          receiveReactorsAction({
            data: indexBy(prop('eicCode'), data),
          }),
        ),
      )
      .catch(
        errors =>
          console.error(errors) && dispatch(receiveReactorsAction({ errors })),
      );
  };
}

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function reactorsReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REACTORS_LOAD_ACTION:
      return { ...state, loading: true };
    case REACTORS_RECEIVE_ACTION:
      return {
        ...state,
        loading: false,
        loaded: !action.errors,
        errors: action.errors || null,
        data: action.data || {},
      };
    default:
      return state;
  }
}

export function reactorsLoadedSelector(state) {
  return state.reactors.loaded;
}

function getStatus(unavailability) {
  if (unavailability) {
    if (unavailability.availablePower_MW === 0) {
      if (unavailability.type === 'PLANNED_MAINTENANCE') {
        return 'PLANNED_STOP';
      }
      return 'AUTO_STOP';
    }
    return 'LIMITED';
  }
  return 'RUNNING';
}

export function reactorSelector(eicCode, state) {
  const reactor = state.reactors.data[eicCode];
  const dayProductions = productionSelector(eicCode, state);
  const unavailability = unavalabilitySelector(eicCode, state);

  return {
    ...reactor,
    status: getStatus(unavailability),
    dayProductions,
    unavailability,
  };
}

export function reactorsSelector(state) {
  return values(state.reactors.data).map(reactor =>
    reactorSelector(reactor.eicCode, state),
  );
}

export function reactorsOfPlantSelector(plantId, state) {
  const reactors = Object.values(state.reactors.data)
    .filter(reactor => reactor.plantId === plantId)
    .map(reactor => reactorSelector(reactor.eicCode, state));

  return sortBy(prop('reactorIndex'), reactors);
}

const INIT_DATA = {
  availablePower: 0,
  totalPower: 0,
  availableCount: 0,
  partiallyUnavailableCount: 0,
  totallyUnavailableCount: 0,
};
export function reactorSetIndicatorsSelector(hourOfDay, state) {
  const reactors = reactorsSelector(state);

  return reactors.reduce((res, reactor) => {
    const res2 = {
      availablePower: 0,
      availableCount: 0,
      partially: 0,
      totally: 0,
    };

    if (reactor.unavailability) {
      if (reactor.unavailability.availablePower_MW === 0) {
        res2.totally = 1;
      } else {
        res2.partially = 1;
      }
      res2.availablePower = reactor.unavailability.availablePower_MW;
    } else {
      res2.availableCount = 1;
      res2.availablePower = reactor.power_MW;
    }

    return {
      totalPower: res.totalPower + reactor.power_MW,
      availablePower: res.availablePower + res2.availablePower,
      availableCount: res.availableCount + res2.availableCount,
      totallyUnavailableCount: res.totallyUnavailableCount + res2.totally,
      partiallyUnavailableCount: res.partiallyUnavailableCount + res2.partially,
    };
  }, INIT_DATA);
}

export function reactorByPlantAndIndexSelector(
  { plantId, reactorIndex },
  state,
) {
  const reacto = Object.values(state.reactors.data).find(
    reactor =>
      reactor.plantId === plantId && reactor.reactorIndex === reactorIndex,
  );
  return reacto && reactorSelector(reacto.eicCode, state);
}

export default reactorsReducer;
