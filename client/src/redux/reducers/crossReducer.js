/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayMode: 'MAP',
  currentCategory: 'NUCLEAR',
};

export const crossSlice = createSlice({
  name: 'cross',
  initialState,
  reducers: {
    changeDisplayMode: (state, action) => {
      state.displayMode = action.payload;
    },
    changeCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { changeDisplayMode, changeCurrentCategory } = crossSlice.actions;

export default crossSlice.reducer;
