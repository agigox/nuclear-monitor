/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayMode: 'SLICES',
  currentAvailability: null,
  currentCategory: 'NUCLEAR',
};

export const crossSlice = createSlice({
  name: 'cross',
  initialState,
  reducers: {
    changeDisplayMode: (state, action) => {
      state.displayMode = action.payload;
    },
    changeCurrentAvailability: (state, action) => {
      state.currentAvailability = action.payload;
    },
    changeCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const {
  changeDisplayMode,
  changeCurrentAvailability,
  changeCurrentCategory,
} = crossSlice.actions;

export default crossSlice.reducer;
