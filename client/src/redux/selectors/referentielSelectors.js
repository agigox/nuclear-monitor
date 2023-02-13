/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByKey } from '../../utils';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectRefItems = (state) => {
  return state.referentiel.items;
};
export const selectGroupedRefByProductionType = createSelector(
  [selectRefItems],
  (referentiel) => {
    const groupByCategory = groupByKey(referentiel, 'category');
    groupByCategory.unshift({ key: 'ALL', values: referentiel });
    return groupByCategory;
  },
);
export const selectCategoryTotalUnits = createSelector(
  [selectGroupedRefByProductionType, selectCurrentCategory],
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

/*-----*/
export const selectCurrentReferentiel = createSelector(
  [selectCurrentCategory, selectRefItems],
  (category, items) => {
    const result = items.find((item) => {
      return item.key === category;
    });
    if (_.isUndefined(result)) {
      return [];
    }
    return result.values;
  },
);

export const selectGenerationUnitsByProductionUnit = createSelector(
  [
    selectCurrentReferentiel,
    (state, productionUnit) => {
      return productionUnit;
    },
  ],
  (currentReferentiel, productionUnit) => {
    return currentReferentiel.find((item) => {
      return item.key === productionUnit;
    }).values;
  },
);

export const selectPmaxByProductionUnit = createSelector(
  [
    selectCurrentReferentiel,
    (state, productionUnit) => {
      return productionUnit;
    },
  ],
  (currentReferentiel, productionUnit) => {
    return currentReferentiel
      .find((item) => {
        return item.key === productionUnit;
      })
      .values.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.installedCapacity;
      }, 0);
  },
);
