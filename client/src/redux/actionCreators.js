import { actionTypes } from './actionTypes';

export const loadRectors = data => ({
  type: actionTypes.LOAD_REACTORS_REQUEST,
  playload: data,
});
export const changeDisplayToMap = data => ({
  type: actionTypes.CHANGE_DISPLAY_TO_MAP,
  payload: data,
});
