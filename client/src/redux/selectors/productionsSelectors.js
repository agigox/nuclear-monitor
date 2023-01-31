/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectPerProductionTypeItems = (state) =>
  state.productions.perProductionTypeItems;
export const selectPerUnitItems = (state) => state.productions.perUnitItems;

export const selectPerUnitItemsOfCurrentCategory = createSelector(
  [selectPerUnitItems, selectCurrentCategory],
  (perUnitItems, currentCategory) => {
    const items = perUnitItems.find((item) => item.key === currentCategory);
    if (_.isUndefined(perUnitItems)) {
      return [];
    }
    return items.values;
  },
);
export const selectPerProductionTypeItemsOfCurrentCategory = createSelector(
  [selectPerProductionTypeItems, selectCurrentCategory],
  (perProductionTypeItems, currentCategory) =>
    perProductionTypeItems.find((item) => item.key === currentCategory),
);

export const selectPerUnitItemOfCurrentCategoryByEicCode = createSelector(
  [selectPerUnitItemsOfCurrentCategory, (state, eicCode) => eicCode],
  (perUnitItems, eicCode) => {
    const newUnavailabilities = perUnitItems.find((fd) => fd.key === eicCode);
    if (_.isUndefined(newUnavailabilities)) {
      return [];
    }
    return newUnavailabilities.values[0];
  },
);

export const selectProductionOfCurrentCategoryByEicCode = createSelector(
  [selectPerUnitItemsOfCurrentCategory, (state, eicCode) => eicCode],
  (items, eicCode) => items.find((fd) => fd.key === eicCode).values[0],
);
