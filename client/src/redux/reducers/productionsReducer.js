/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  length: 0,
  perProductionTypeItems: [],
  perUnitItems: [],
  error: {},
};

export const productionsSlice = createSlice({
  name: 'productions',
  initialState,
  reducers: {
    loadProductionsPerProductionTypeSuccess: (state, action) => {
      state.perProductionTypeItems = [...action.payload.items];
    },
    loadProductionsPerProductionTypeFail: (state, action) => {
      state.error = { ...action.error };
    },
    loadProductionsPerUnitSuccess: (state, action) => {
      state.perUnitItems = [...action.payload.items];
    },
    loadProductionsPerUnitFail: (state, action) => {
      state.error = { ...action.error };
    },
  },
});

export const {
  loadProductionsPerProductionTypeSuccess,
  loadProductionsPerUnitSuccess,
  loadProductionsPerProductionTypeFail,
  loadProductionsPerUnitFail,
} = productionsSlice.actions;

export default productionsSlice.reducer;
