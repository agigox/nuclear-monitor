import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectCategoriesPending = (state) =>
  state.productionCategories.categoriesPending;
export const selectCategoriesRefreshPending = (state) =>
  state.productionCategories.categoriesRefreshPending;
export const selectLength = (state) => state.productionCategories.length;
export const selectCategories = (state) =>
  state.productionCategories.categories;
export const selectError = (state) => state.productionCategories.error;
export const selectLastRefreshDate = (state) =>
  state.productionCategories.lastRefreshDate;

export const selectUnavailabilitiesOfCurrentCategory = createSelector(
  [selectCurrentCategory, selectCategories],
  (category, items) => items.find((item) => item.key === category).values,
);

export const selectUnavailabilityOfCurrentCategoryByEicCode = createSelector(
  [selectUnavailabilitiesOfCurrentCategory, (state, eicCode) => eicCode],
  (unavailabilities, eicCode) =>
    unavailabilities.find((fd) => fd.eicCode === eicCode),
);

export const selectCurrentFullyDown = createSelector(
  selectUnavailabilitiesOfCurrentCategory,
  selectCurrentCategory,
  (cpt, cc) => {
    let result = cpt.find((item) => item.key === cc);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.partition.fullyDown;
  },
);
export const selectCurrentPartiallyDown = createSelector(
  selectUnavailabilitiesOfCurrentCategory,
  selectCurrentCategory,
  (cpt, cc) => {
    let result = cpt.find((item) => item.key === cc);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.partition.partiallyDown;
  },
);
export const selectCurrentFullyDownTotal = createSelector(
  selectUnavailabilitiesOfCurrentCategory,
  selectCurrentCategory,
  (cpt, cc) => {
    let result = cpt.find((item) => item.key === cc);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.partition.fullyDown.length;
  },
);
export const selectCurrentPartiallyDownTotal = createSelector(
  selectUnavailabilitiesOfCurrentCategory,
  selectCurrentCategory,
  (cpt, cc) => {
    let result = cpt.find((item) => item.key === cc);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.partition.partiallyDown.length;
  },
);
export const selectCurrentFullyDownCapacity = createSelector(
  selectUnavailabilitiesOfCurrentCategory,
  selectCurrentCategory,
  (cpt, cc) => {
    let result = cpt.find((item) => item.key === cc);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.partition.fullyDown.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.unavailableCapacitySum,
      0,
    );
  },
);
export const selectCurrentPartiallyDownCapacity = createSelector(
  selectUnavailabilitiesOfCurrentCategory,
  selectCurrentCategory,
  (cpt, cc) => {
    let result = cpt.find((item) => item.key === cc);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.partition.partiallyDown.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.unavailableCapacitySum,
      0,
    );
  },
);

export const selectCurrentDownCapacity = createSelector(
  selectCurrentFullyDownCapacity,
  selectCurrentPartiallyDownCapacity,
  (cpt, cc) => cpt + cc,
);

export const selectFullyDownByPlant = createSelector(
  [selectCurrentFullyDown, (state, plant) => plant],
  (fullyDowns, plant) => {
    const newFullyDowns = fullyDowns.filter(
      (fd) => fd.name.indexOf(plant) >= 0,
    );
    return newFullyDowns;
  },
);
export const selectPartiallyDownByPlant = createSelector(
  [selectCurrentPartiallyDown, (state, plant) => plant],
  (partiallyDowns, plant) => {
    const newPartiallyDownsDowns = partiallyDowns.filter(
      (fd) => fd.name.indexOf(plant) >= 0,
    );
    return newPartiallyDownsDowns;
  },
);
