/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  itemsPerProductionUnit: [],
  itemsPerProductionType: [],
  error: {},
  lastRefreshHour: moment().format('DD/MM/YYYY - HH[h]mm'),
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadDataSuccess: (state, action) => {
      state.itemsPerProductionUnit = [
        ...action.payload.itemsPerProductionUnit.items,
      ];
      state.itemsPerProductionType = [
        ...action.payload.itemsPerProductionType.items,
      ];
    },
    loadDataFail: (state, action) => {
      state.error = { ...action.error };
    },
  },
});

export const { loadDataSuccess, loadDataFail } = dataSlice.actions;

export default dataSlice.reducer;
