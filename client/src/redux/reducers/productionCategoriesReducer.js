/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { getProductionCategories } from '../../api';

const initialState = {
  categoriesPending: true,
  length: 0,
  categories: [],
  error: '',
  lastRefreshDate: '',
};

export const productionCategoriesSlice = createSlice({
  name: 'productionCategories',
  initialState,
  reducers: {
    loadProductionCategoriesSuccess: (state, action) => {
      state.categories = [...action.payload.items];
      state.categoriesPending = false;
      state.lastRefreshDate = moment().format('DD/MM/YYYY - HH[h]mm');
    },
    loadProductionCategoriesFail: (state, action) => {
      state = {
        ...state,
        categoriesPending: false,
        error: action.message.message,
      };
    },
    refreshProductionCategories: (state) => {
      state.categoriesPending = true;
    },
  },
});

export const { loadProductionCategoriesSuccess, loadProductionCategoriesFail } =
  productionCategoriesSlice.actions;

export const loadProductionCategories = () => async (dispatch) => {
  const response = await getProductionCategories();
  dispatch(loadProductionCategoriesSuccess(response));
};
export const refreshProductionCategories = () => async (dispatch) => {
  dispatch(refreshProductionCategories());
  const response = await getProductionCategories();
  dispatch(loadProductionCategoriesSuccess(response));
};

export default productionCategoriesSlice.reducer;
