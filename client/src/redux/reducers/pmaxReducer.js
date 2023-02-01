/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  error: {},
};
export const pmaxSlice = createSlice({
  name: 'pmax',
  initialState,
  reducers: {
    loadPmaxSuccess: (state, action) => {
      state.items = [...action.payload.items];
    },
    loadPmaxFail: (state, action) => {
      state.error = { ...action.error };
    },
  },
});
export const { loadPmaxSuccess, loadPmaxFail } = pmaxSlice.actions;

export default pmaxSlice.reducer;
