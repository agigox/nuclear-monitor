import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

// eslint-disable-next-line import/prefer-default-export
export const selectReferentielPending = (state) =>
  state.referentiel.referentielPending;
export const selectReferentiel = (state) => state.referentiel.referentiel;
export const selectCurrentCategory = (state) => state.cross.currentCategory;
export const selectCurrentReferentiel = createSelector(
  [
    (state) => state.cross.currentCategory,
    (state) => state.referentiel.referentiel,
  ],
  (category, items) => {
    let result = items.find((item) => item.key === category);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }
    return result;
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
          innerAccumulator + innerCurrentValue.netPowerMW,
        0,
      );
      return accumulator + innerTotal;
    }, 0);
  },
);

export const selectReactorsByPlant = createSelector(
  [selectCurrentReferentiel, (state, plant) => plant],
  (referentiel, plant) => {
    let result = referentiel.values.find((item) => item.key === plant);
    if (_.isUndefined(result)) {
      result = { key: '', values: [] };
    }

    return result;
  },
);
