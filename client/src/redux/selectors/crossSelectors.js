import { createSelector } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const selectDisplayMode = (state) => state.cross.displayMode;
export const selectCurrentAvailability = (state) =>
  state.cross.currentAvailability;
export const selectCurrentCategory = (state) => state.cross.currentCategory;
export const selectCurrentUnavailabilities = createSelector(
  [
    // Usual first input - extract value from `state`
    (state) => state.cross.currentCategory,
    // Take the second arg, `category`, and forward to the output selector
    (state) => state.productionCategories.categories,
  ],
  // Output selector gets (`items, category)` as args
  (category, items) => items.filter((item) => item.key === category),
);
