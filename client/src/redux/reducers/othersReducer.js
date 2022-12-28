import { actionTypes } from '../actionTypes';

const initialState = {
  displayMap: true,
};
// eslint-disable-next-line default-param-last
const othersReducer = (state = initialState, action) => {
  switch (action.type) {
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
export default othersReducer;
