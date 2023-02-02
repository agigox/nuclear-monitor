/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  length: 0,
  perProductionTypeItems: [],
  perUnitItems: {
    lengthEic: 0,
    itemsByEicCode: [],
    lengthProductionUnit: 0,
    itemsByProductionUnit: [],
  },
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
      state.perUnitItems.lengthEic = action.payload.lengthEic;
      state.perUnitItems.lengthProductionUnit =
        action.payload.lengthProductionunit;
      state.perUnitItems.itemsByEicCode = action.payload.itemsByEicCode;
      state.perUnitItems.itemsByProductionUnit =
        action.payload.itemsByProductionUnit;
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
