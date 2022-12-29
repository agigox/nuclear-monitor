import { actionTypes } from '../actionTypes';

const initialState = {
  mode: true,
};
// eslint-disable-next-line default-param-last
const crossReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_DISPLAY_TO_MAP: {
      return {
        ...state,
        mode: !state.mode,
      };
    }

    default: {
      return state;
    }
  }
};
export default crossReducer;
