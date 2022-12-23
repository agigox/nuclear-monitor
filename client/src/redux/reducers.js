import { actionTypes } from './actionTypes';

const initialState = {
  loadings: {
    unavailibilities: true,
  },
  reactors: [],
  displayMap: true,
};
// Reducer the change the currently displayed actions
// eslint-disable-next-line import/prefer-default-export, default-param-last
export const addToCart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_REACTORS_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.REACTORS_RECEIVED: {
      return {
        ...state,
        reactors: [...action.reactors.unavailibilities],
        loadings: {
          ...state.loadings,
          unavailibilities: false,
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
