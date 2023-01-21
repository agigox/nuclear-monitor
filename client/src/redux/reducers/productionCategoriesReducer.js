import { actionTypes } from '../actionTypes';

const initialState = {
  loading: true,
  length: 0,
  items: [],
  error: '',
};
// eslint-disable-next-line default-param-last
const productionCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTION_CATEGORIES_REQUEST: {
      return {
        ...state,
      };
    }
    case actionTypes.PRODUCTION_CATEGORIES_RECEIVED_SUCCESS: {
      return {
        ...state,
        items: [...action.data.items],
        loading: false,
      };
    }
    case actionTypes.PRODUCTION_CATEGORIES_RECEIVED_FAIL: {
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
export default productionCategoriesReducer;
