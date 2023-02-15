/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByKey } from '../../utils';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectRefItems = (state) => {
  return state.referentiel.items;
};
export const selectReferentielByProductionCategory = createSelector(
  [selectRefItems],
  (referentiel) => {
    const groupByCategory = groupByKey(referentiel, 'productionCategory');
    groupByCategory.unshift({ key: 'ALL', values: referentiel });
    return groupByCategory;
  },
);
export const selectCategoryTotalUnits = createSelector(
  [selectReferentielByProductionCategory, selectCurrentCategory],
  (items, category) => {
    const result = items.find((item) => {
      return item.key === category;
    });
    if (_.isUndefined(result)) {
      return [];
    }
    return result.values.length;
  },
);
