/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getProductions } from '../../api';

const initialState = {
  productionsPending: true,
  length: 0,
  items: [],
  error: '',
};

export const productionsSlice = createSlice({
  name: 'productions',
  initialState,
  reducers: {
    loadProductionsSuccess: (state, action) => {
      state.items = [...action.payload.items];
      state.productionsPending = false;
    },
    loadProductionsFail: (state, action) => {
      state = {
        ...state,
        productionsPending: false,
        error: action.message.message,
      };
    },
  },
});

export const { loadProductionsSuccess, loadProductionsFail } =
  productionsSlice.actions;

export const loadProductions = () => async (dispatch) => {
  const response = await getProductions();
  dispatch(loadProductionsSuccess(response));
};

export default productionsSlice.reducer;
