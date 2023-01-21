import { actionTypes } from '../actionTypes';

const changeMode = (data) => ({
  type: actionTypes.CHANGE_DISPLAY_MODE,
  payload: data,
});
const changeCurrent = (data) => ({
  type: actionTypes.CHANGE_CURRENT_AVAILABILITY,
  payload: data,
});
const resetCurrent = () => ({
  type: actionTypes.RESET_CURRENT_AVAILABILITY,
});

export default {
  changeMode,
  changeCurrent,
  resetCurrent,
};
