/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getPmax } from '../../api';

const initialState = {
  pmaxPending: true,
  items: [],
  error: '',
};
export const pmaxSlice = createSlice({
  name: 'pmax',
  initialState,
  reducers: {
    loadPmaxSuccess: (state, action) => {
      state.items = [...action.payload.items];
      state.pmaxPending = false;
    },
    loadPmaxFail: (state, action) => {
      state = {
        ...state,
        pmaxPending: false,
        error: action.message.message,
      };
    },
  },
});
export const { loadPmaxSuccess, loadPmaxFail } = pmaxSlice.actions;

export const loadPmax = () => async (dispatch) => {
  const response = await getPmax();
  dispatch(loadPmaxSuccess(response));
};

export default pmaxSlice.reducer;
