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
  categoriesRefreshPending: false,
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
    refreshProductionCategoriesRequest: (state) => {
      state.categoriesRefreshPending = true;
    },
    refreshProductionCategoriesSuccess: (state, action) => {
      state.categories = [...action.payload.items];
      state.lastRefreshDate = moment().format('DD/MM/YYYY - HH[h]mm');
      state.categoriesRefreshPending = false;
    },
  },
});

export const {
  loadProductionCategoriesSuccess,
  loadProductionCategoriesFail,
  refreshProductionCategoriesSuccess,
  refreshProductionCategoriesRequest,
} = productionCategoriesSlice.actions;

export const loadProductionCategories = () => async (dispatch) => {
  const response = await getProductionCategories();
  dispatch(loadProductionCategoriesSuccess(response));
};
export const refreshProductionCategories = () => async (dispatch) => {
  dispatch(refreshProductionCategoriesRequest());
  const response = await getProductionCategories();
  dispatch(refreshProductionCategoriesSuccess(response));
};

export default productionCategoriesSlice.reducer;
