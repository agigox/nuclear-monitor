import { actionTypes } from '../actionTypes';

const initialState = {
  loading: true,
  referentiel: [],
  error: '',
};
// eslint-disable-next-line default-param-last
const referentielReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_REFERENTIEL_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.REFERENTIEL_RECEIVED_SUCCESS: {
      return {
        ...state,
        referentiel: [...action.data.types],
        loading: false,
      };
    }
    case actionTypes.REFERENTIEL_RECEIVED_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.message.message,
      };
    }

    default: {
      return state;
    }
  }
};
export default referentielReducer;
