import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectReferentiel = (state) => state.referentiel.items;
export const selectCurrentReferentiel = createSelector(
  [selectCurrentCategory, selectReferentiel],
  (category, items) => {
    const result = items.find((item) => item.key === category);
    if (_.isUndefined(result)) {
      return [];
    }
    return result.values;
  },
);
export const selectCurrentCategoryGenerationUnitsNumber = createSelector(
  [selectCurrentReferentiel],
  (items) =>
    items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.values.length,
      0,
    ),
);

export const selectGenerationUnitsByProductionUnit = createSelector(
  [selectCurrentReferentiel, (state, productionUnit) => productionUnit],
  (currentReferentiel, productionUnit) =>
    currentReferentiel.find((item) => item.key === productionUnit).values,
);

export const selectPmaxByProductionUnit = createSelector(
  [selectCurrentReferentiel, (state, productionUnit) => productionUnit],
  (currentReferentiel, productionUnit) =>
    currentReferentiel
      .find((item) => item.key === productionUnit)
      .values.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.installedCapacity,
        0,
      ),
);
