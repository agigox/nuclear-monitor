import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectPmaxPending = (state) => {
  return state.pmax.pmaxPending;
};
export const selectPmaxItems = (state) => {
  return state.pmax.items;
};
export const selectCurrentCategoryPmaxCapacity = createSelector(
  [selectPmaxItems, selectCurrentCategory],
  (pmaxItems, currentCategory) =>
    // debugger;
    {
      return pmaxItems.find((item) => {
        return item.key === currentCategory;
      }).installedCapacity;
    },
);
export const selectPmaxCapacityByCategory = createSelector(
  [
    selectPmaxItems,
    (state, category) => {
      return category;
    },
  ],
  (pmaxItems, category) =>
    // debugger;
    {
      return pmaxItems.find((item) => {
        return item.key === category;
      }).installedCapacity;
    },
);
