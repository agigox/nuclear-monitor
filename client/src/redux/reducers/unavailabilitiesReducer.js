import { actionTypes } from '../actionTypes';

const initialState = {
  loadings: {
    unavailabilities: true,
  },
  unavailabilities: [],
  error: '',
  overview: {},
};
// eslint-disable-next-line default-param-last
const unavailabilitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_UNAVAILABILITIES_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.UNAVAILABILITIES_RECEIVED_SUCCESS: {
      return {
        ...state,
        unavailabilities: [...action.data.unavailabilities],
        loadings: {
          ...state.loadings,
          unavailabilities: false,
        },
        overview: { ...action.data.overview },
      };
    }
    case actionTypes.UNAVAILABILITIES_RECEIVED_FAIL: {
      return {
        ...state,
        loadings: {
          ...state.loadings,
          unavailabilities: false,
        },
        error: action.message,
      };
    }

    default: {
      return state;
    }
  }
};
export default unavailabilitiesReducer;
