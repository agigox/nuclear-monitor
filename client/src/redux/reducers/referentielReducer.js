/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  length: 0,
  items: [],
  error: {},
};
export const referentielSlice = createSlice({
  name: 'referentiel',
  initialState,
  reducers: {
    loadReferentielSuccess: (state, action) => {
      state.length = action.payload.items.length;
      state.items = [...action.payload.items];
    },
    loadReferentielFail: (state, action) => {
      state.error = { ...action.error };
    },
  },
});
export const { loadReferentielSuccess, loadReferentielFail } =
  referentielSlice.actions;

export default referentielSlice.reducer;
