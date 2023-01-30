import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectReferentielPending = (state) =>
  state.referentiel.referentielPending;
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
export const selectCurrentTotal = createSelector(
  [
    (state) => state.cross.currentCategory,
    (state) => state.referentiel.referentiel,
  ],
  (category, items) => {
    let result = items.find((item) => item.key === category);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.values.reduce(
      (accumulator, currentValue) => accumulator + currentValue.values.length,
      0,
    );
  },
);
export const selectCurrentPower = createSelector(
  [
    (state) => state.cross.currentCategory,
    (state) => state.referentiel.referentiel,
  ],
  (category, items) => {
    let result = items.find((item) => item.key === category);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result.values.reduce((accumulator, currentValue) => {
      const innerTotal = currentValue.values.reduce(
        (innerAccumulator, innerCurrentValue) =>
          innerAccumulator + innerCurrentValue.installedCapacity,
        0,
      );
      return accumulator + innerTotal;
    }, 0);
  },
);

export const selectGenerationUnitsByProductionUnit = createSelector(
  [selectCurrentReferentiel, (state, productionUnit) => productionUnit],
  (currentReferentiel, productionUnit) =>
    currentReferentiel.find((item) => item.key === productionUnit).values,
);

export const selectEicCodesByPlant = createSelector(
  [selectCurrentReferentiel, (state, plant) => plant],
  (referentiel, plant) => {
    const result = referentiel.values.find((item) => item.key === plant);

    return result.values.map((e) => e.eicCode);
  },
);
