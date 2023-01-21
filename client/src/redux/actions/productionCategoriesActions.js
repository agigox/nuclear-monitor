import { actionTypes } from '../actionTypes';

const loadProductionCategories = (data) => ({
  type: actionTypes.LOAD_PRODUCTION_CATEGORIES_REQUEST,
  playload: data,
});
export default {
  loadProductionCategories,
};
