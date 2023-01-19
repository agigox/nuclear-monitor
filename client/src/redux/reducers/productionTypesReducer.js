import { actionTypes } from '../actionTypes';

const initialState = {
  loading: true,
  length: 0,
  items: [],
  error: '',
};
// eslint-disable-next-line default-param-last
const productionTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTION_TYPES_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.PRODUCTION_TYPES_RECEIVED_SUCCESS: {
      console.log(action.data);
      return {
        ...state,
        items: [...action.data.items],
        loading: false,
      };
    }
    case actionTypes.PRODUCTION_TYPES_RECEIVED_FAIL: {
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
export default productionTypesReducer;
