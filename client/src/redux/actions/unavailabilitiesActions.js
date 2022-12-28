import { actionTypes } from '../actionTypes';

const loadUnavailabilities = (data) => ({
  type: actionTypes.LOAD_UNAVAILABILITIES_REQUEST,
  playload: data,
});
const changeMode = (data) => ({
  type: actionTypes.CHANGE_DISPLAY_TO_MAP,
  payload: data,
});
export default {
  loadUnavailabilities,
  changeMode,
};
