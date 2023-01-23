/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getReferentiel } from '../../api';

const initialState = {
  referentielPending: true,
  referentiel: [],
  error: '',
};
export const referentielSlice = createSlice({
  name: 'referentiel',
  initialState,
  reducers: {
    loadReferentielSuccess: (state, action) => {
      state.referentiel = [...action.payload.items];
      state.referentielPending = false;
    },
    loadReferentielFail: (state, action) => {
      state = {
        ...state,
        categoriesPending: false,
        error: action.message.message,
      };
    },
  },
});
export const { loadReferentielSuccess, loadReferentielFail } =
  referentielSlice.actions;

export const loadReferentiel = () => async (dispatch) => {
  const response = await getReferentiel();
  dispatch(loadReferentielSuccess(response));
};

export default referentielSlice.reducer;
