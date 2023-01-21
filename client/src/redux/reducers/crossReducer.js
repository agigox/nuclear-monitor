import { actionTypes } from '../actionTypes';

const initialState = {
  mode: 'map',
  currentAvailability: null,
  currentCategory: 'HYDRAULICS',
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
        currentAvailability: action.payload,
      };
    }
    case actionTypes.RESET_CURRENT_AVAILABILITY: {
      return {
        ...state,
        currentAvailability: null,
      };
    }
    case actionTypes.CHANGE_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: action.payload,
      };
    }
    case actionTypes.RESET_CURRENT_CATEGORY: {
      return {
        ...state,
        currentCategory: null,
      };
    }

    default: {
      return state;
    }
  }
};
export default crossReducer;
