/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  length: 0,
  items: [],
  error: {},
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    loadDataSuccess: (state, action) => {
      state.items = [...action.payload.items];
    },
    loadDataFail: (state, action) => {
      state.error = { ...action.error };
    },
  },
});

export const { loadDataSuccess, loadDataFail } = dataSlice.actions;

export default dataSlice.reducer;
