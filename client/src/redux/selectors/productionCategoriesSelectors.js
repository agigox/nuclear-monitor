// eslint-disable-next-line import/prefer-default-export
export const selectCategoriesPending = (state) =>
  state.productionCategories.categoriesPending;
export const selectLength = (state) => state.productionCategories.length;
export const selectCategories = (state) =>
  state.productionCategories.categories;
export const selectError = (state) => state.productionCategories.error;
export const selectLastRefreshDate = (state) =>
  state.productionCategories.lastRefreshDate;
