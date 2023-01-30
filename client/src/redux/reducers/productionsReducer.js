/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getProductionsPerProductionType,
  getProductionsPerUnit,
} from '../../api';

const initialState = {
  productionsPending: true,
  length: 0,
  perProductionTypeItems: [],
  perUnitItems: [],
  error: '',
};

export const productionsSlice = createSlice({
  name: 'productions',
  initialState,
  reducers: {
    loadProductionsPerProductionTypeSuccess: (state, action) => {
      state.perProductionTypeItems = [...action.payload.items];
      state.productionsPending = false;
    },
    loadProductionsPerProductionTypeFail: (state, action) => {
      state = {
        ...state,
        productionsPending: false,
        error: action.message.message,
      };
    },
    loadProductionsPerUnitSuccess: (state, action) => {
      state.perUnitItems = [...action.payload.items];
      state.productionsPending = false;
    },
    loadProductionsPerUnitFail: (state, action) => {
      state = {
        ...state,
        productionsPending: false,
        error: action.message.message,
      };
    },
  },
});

export const {
  loadProductionsPerProductionTypeSuccess,
  loadProductionsPerUnitSuccess,
  loadProductionsPerProductionTypeFail,
  loadProductionsPerUnitFail,
} = productionsSlice.actions;

export const loadProductionsPerProductionType = () => async (dispatch) => {
  const response = await getProductionsPerProductionType();
  dispatch(loadProductionsPerProductionTypeSuccess(response));
};
export const loadProductionsPerUnit = () => async (dispatch) => {
  const response = await getProductionsPerUnit();
  dispatch(loadProductionsPerUnitSuccess(response));
};

export default productionsSlice.reducer;
