/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectPerProductionTypeItems = (state) =>
  state.productions.perProductionTypeItems;
export const selectPerUnitItemsByEicCode = (state) =>
  state.productions.perUnitItems.itemsByEicCode;
export const selectPerUnitItemsByProductionUnit = (state) =>
  state.productions.perUnitItems.itemsByProductionUnit;

export const selectPerUnitItemsByEicCodeOfCurrentCategory = createSelector(
  [selectPerUnitItemsByEicCode, selectCurrentCategory],
  (perUnitItems, currentCategory) => {
    const items = perUnitItems.find((item) => item.key === currentCategory);
    return items.values;
  },
);
export const selectPerUnitItemsByProductionUnitOfCurrentCategory =
  createSelector(
    [selectPerUnitItemsByProductionUnit, selectCurrentCategory],
    (perUnitItems, currentCategory) => {
      const items = perUnitItems.find((item) => item.key === currentCategory);
      return items.values;
    },
  );
export const selectPerProductionTypeItemsOfCurrentCategory = createSelector(
  [selectPerProductionTypeItems, selectCurrentCategory],
  (perProductionTypeItems, currentCategory) =>
    perProductionTypeItems.find((item) => item.key === currentCategory),
);

export const selectPerUnitItemOfCurrentCategoryByEicCode = createSelector(
  [selectPerUnitItemsByEicCodeOfCurrentCategory, (state, eicCode) => eicCode],
  (perUnitItems, eicCode) => {
    const newUnavailabilities = perUnitItems.find((fd) => fd.key === eicCode);
    if (_.isUndefined(newUnavailabilities)) {
      return [];
    }
    return newUnavailabilities.values[0];
  },
);

export const selectProductionOfCurrentCategoryByEicCode = createSelector(
  [selectPerUnitItemsByEicCodeOfCurrentCategory, (state, eicCode) => eicCode],
  (items, eicCode) => items.find((fd) => fd.key === eicCode).values[0],
);
export const selectProductionByProductionUnit = createSelector(
  [
    selectPerUnitItemsByProductionUnitOfCurrentCategory,
    (state, productionUnit) => productionUnit,
  ],
  (items, productionUnit) => {
    const result = items
      .find((item) => item.key === productionUnit)
      .values.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.lastProduction.value,
        0,
      );
    return result >= 0 ? result : 0;
  },
);
