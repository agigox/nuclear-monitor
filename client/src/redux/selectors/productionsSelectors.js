import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectProductionsPending = (state) =>
  state.productions.productionsPending;
export const selectLength = (state) => state.productions.length;
export const selectProductionIntems = (state) => state.productions.items;
export const selectError = (state) => state.productions.error;
export const selectCurrentCategoryLastProduction = createSelector(
  [selectProductionIntems, selectCurrentCategory],
  (productionItems, currentCategory) =>
    productionItems.find((item) => item.key === currentCategory).lastProduction,
);
