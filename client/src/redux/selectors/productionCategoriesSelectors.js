import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectCategoriesRefreshPending = (state) =>
  state.productionCategories.categoriesRefreshPending;
export const selectLength = (state) => state.productionCategories.length;
export const selectItems = (state) =>
  // eslint-disable-next-line no-debugger
  // debugger;
  state.productionCategories.items;
export const selectItemsPerUnit = (state) =>
  state.productionCategories.items.itemsPerUnit;
export const itemsPerProductionUnit = (state) =>
  state.productionCategories.items.itemsPerProductionUnit;

export const selectError = (state) => state.productionCategories.error;
export const selectLastRefreshDate = (state) =>
  state.productionCategories.lastRefreshDate;

export const selectUnavailabilitiesPerUnitOfCurrentCategory = createSelector(
  [selectCurrentCategory, selectItems],
  (category, items) => items.find((item) => item.key === category).itemsPerUnit,
);

export const selectUnavailabilitiesPerProductionUnitOfCurrentCategory =
  createSelector(
    [selectCurrentCategory, selectItems],
    (category, items) =>
      items.find((item) => item.key === category).itemsPerProductionUnit,
  );

export const selectUnavailabilityOfCurrentCategoryByEicCode = createSelector(
  [selectUnavailabilitiesPerUnitOfCurrentCategory, (state, eicCode) => eicCode],
  (unavailabilities, eicCode) =>
    unavailabilities.find((fd) => fd.eicCode === eicCode),
);
export const selectUnavailabilitiesOfCurrentCategoryCapacity = createSelector(
  [selectUnavailabilitiesPerUnitOfCurrentCategory],
  (unavailabilities) =>
    unavailabilities.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.unavailability.unavailable_capacity,
      0,
    ),
);
export const selectUnavailabilitiesByCategoryCapacity = createSelector(
  [selectItems, (state, category) => category],
  (items, category) => {
    const unavailabilities = items.find(
      (item) => item.key === category,
    ).itemsPerUnit;
    return unavailabilities.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.unavailability.unavailable_capacity,
      0,
    );
  },
);
export const selectFullyDownUnavailabilityOfCurrentCategoryNumber =
  createSelector(
    [selectUnavailabilitiesPerUnitOfCurrentCategory],
    (unavailabilities) =>
      unavailabilities.filter((u) => u.unavailability.available_capacity === 0)
        .length,
  );
export const selectPartiallyDownUnavailabilityOfCurrentCategoryNumber =
  createSelector(
    [selectUnavailabilitiesPerUnitOfCurrentCategory],
    (unavailabilities) =>
      unavailabilities.filter(
        (u) =>
          u.installedCapacity !== u.unavailability.unavailable_capacity &&
          u.installedCapacity !== u.unavailability.available_capacity,
      ).length,
  );
export const selectUnavailabilityByProductionUnit = createSelector(
  [
    selectUnavailabilitiesPerProductionUnitOfCurrentCategory,
    (state, productionUnit) => productionUnit,
  ],
  (items, productionUnit) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    let capacity = 0;
    const result = items.find((item) => item.key === productionUnit);
    if (!_.isUndefined(result)) {
      capacity = result.values.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.unavailability.unavailable_capacity,
        0,
      );
    }
    return capacity;
  },
);
/** --------------- */
