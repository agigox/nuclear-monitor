/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  error: {},
};
export const referentielSlice = createSlice({
  name: 'referentiel',
  initialState,
  reducers: {
    loadReferentielSuccess: (state, action) => {
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
