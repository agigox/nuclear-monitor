import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectPmaxPending = (state) => state.pmax.pmaxPending;
export const selectPmaxItems = (state) => state.pmax.items;
export const selectCurrentCategoryPmaxCapacity = createSelector(
  [selectPmaxItems, selectCurrentCategory],
  (pmaxItems, currentCategory) =>
    pmaxItems.find((item) => item.key === currentCategory).installedCapacity,
);
