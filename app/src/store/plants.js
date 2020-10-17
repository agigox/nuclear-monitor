import { values, indexBy, prop } from 'ramda';

import { getPlants } from '../api';

import { reactorsOfPlantSelector } from './reactors';

export const PLANTS_LOAD_ACTION = 'PLANTS_LOAD_ACTION';
export const PLANTS_RECEIVE_ACTION = 'PLANTS_RECEIVE_ACTION';

function loadPlantsAction() {
  return { type: PLANTS_LOAD_ACTION };
}

function receivePlantsAction({ data, errors }) {
  return { type: PLANTS_RECEIVE_ACTION, data, errors };
}

export function loadAllPlants() {
  return function dispatchLoadAllPlants(dispatch) {
    dispatch(loadPlantsAction());
    return getPlants()
      .then(data =>
        dispatch(
          receivePlantsAction({
            data: indexBy(prop('id'), data),
          }),
        ),
      )
      .catch(
        errors =>
          console.error(errors) || dispatch(receivePlantsAction({ errors })),
      );
  };
}

const initialState = {
  loading: false,
  loaded: false,
  errors: null,
  data: {},
};

function plantsReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case PLANTS_LOAD_ACTION:
      return { ...state, loading: true };
    case PLANTS_RECEIVE_ACTION:
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

export function plantsLoadedSelector(state) {
  return state.plants.loaded;
}

export function plantSelector({ plantId, date }, state) {
  return (
    state.plants.data[plantId] && {
      ...state.plants.data[plantId],
      reactors: reactorsOfPlantSelector({ plantId, date }, state),
    }
  );
}

export function plantsSelector({ date }, state) {
  return values(state.plants.data).map(plant =>
    plantSelector({ plantId: plant.id, date }, state),
  );
}

export default plantsReducer;
