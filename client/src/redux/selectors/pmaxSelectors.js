import { createSelector } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const selectPmaxPending = (state) => {
  return state.pmax.pmaxPending;
};
export const selectPmaxItems = (state) => {
  return state.pmax.items;
};
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
      }).pmax;
    },
);
