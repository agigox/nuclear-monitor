import { actionTypes } from '../actionTypes';

const initialState = {
  mode: 'map',
  current: null,
};
// eslint-disable-next-line default-param-last
const crossReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DISPLAY_MODE: {
      return {
        ...state,
        mode: action.payload,
      };
    }
    case actionTypes.CHANGE_CURRENT_AVAILABILITY: {
      return {
        ...state,
        current: action.payload,
      };
    }
    case actionTypes.RESET_CURRENT_AVAILABILITY: {
      return {
        ...state,
        current: null,
      };
    }

    default: {
      return state;
    }
  }
};
export default crossReducer;
