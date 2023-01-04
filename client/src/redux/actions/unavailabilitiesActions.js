import { actionTypes } from '../actionTypes';

const loadUnavailabilities = (data) => ({
  type: actionTypes.LOAD_UNAVAILABILITIES_REQUEST,
  playload: data,
});
const changeMode = (data) => ({
  type: actionTypes.CHANGE_DISPLAY_TO_MAP,
  payload: data,
});
const refreshUnavailabilities = (data) => ({
  type: actionTypes.REFRESH_UNAVAILABILITIES_REQUEST,
  playload: data,
});
export default {
  loadUnavailabilities,
  changeMode,
  refreshUnavailabilities,
};
