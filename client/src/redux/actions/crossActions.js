import { actionTypes } from '../actionTypes';

const changeMode = (data) => ({
  type: actionTypes.CHANGE_DISPLAY_TO_MAP,
  payload: data,
});
export default {
  changeMode,
};
