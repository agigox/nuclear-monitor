import { actionTypes } from './actionTypes';

const initialState = {
  loadings: {
    unavailabilities: true,
  },
  unavailabilities: [],
  displayMap: true,
};
// eslint-disable-next-line default-param-last
const getNuclearData = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_UNAVAILABILITIES_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.UNAVAILABILITIES_RECEIVED: {
      return {
        ...state,
        unavailabilities: [...action.data.unavailabilities],
        loadings: {
          ...state.loadings,
          unavailabilities: false,
        },
      };
    }
    case actionTypes.CHANGE_DISPLAY_TO_MAP: {
      return {
        ...state,
        displayMap: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default getNuclearData;
