import { actionTypes } from './actionTypes';

export const loadUnavailabilities = data => ({
  type: actionTypes.LOAD_UNAVAILABILITIES_REQUEST,
  playload: data,
});
export const changeDisplayToMap = data => ({
  type: actionTypes.CHANGE_DISPLAY_TO_MAP,
  payload: data,
});
