import { actionTypes } from '../actionTypes';

const changeDisplayMode = (data) => ({
  type: actionTypes.CHANGE_DISPLAY_MODE,
  payload: data,
});
const changeCurrentAvailability = (data) => ({
  type: actionTypes.CHANGE_CURRENT_AVAILABILITY,
  payload: data,
});
const resetCurrentAvailability = () => ({
  type: actionTypes.RESET_CURRENT_AVAILABILITY,
});
const changeCurrentCategory = (data) => ({
  type: actionTypes.CHANGE_CURRENT_CATEGORY,
  payload: data,
});
const resetCurrentCategory = () => ({
  type: actionTypes.RESET_CURRENT_CATEGORY,
});

export default {
  changeDisplayMode,
  changeCurrentAvailability,
  resetCurrentAvailability,
  changeCurrentCategory,
  resetCurrentCategory,
};
