/* eslint-disable no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectPerProductionTypeItems = (state) => {
  return state.productions.perProductionTypeItems;
};
export const selectPerUnitItemsByEicCode = (state) => {
  return state.productions.perUnitItems.itemsByEicCode;
};
export const selectPerUnitItemsByProductionUnit = (state) => {
  return state.productions.perUnitItems.itemsByProductionUnit;
};

export const selectPerUnitItemsByEicCodeOfCurrentCategory = createSelector(
  [selectPerUnitItemsByEicCode, selectCurrentCategory],
  (perUnitItems, currentCategory) => {
    const items = perUnitItems.find((item) => {
      return item.key === currentCategory;
    });
    return items.values;
  },
);
export const selectPerUnitItemsByProductionUnitOfCurrentCategory =
  createSelector(
    [selectPerUnitItemsByProductionUnit, selectCurrentCategory],
    (perUnitItems, currentCategory) => {
      const items = perUnitItems.find((item) => {
        return item.key === currentCategory;
      });
      return items.values;
    },
  );
export const selectPerProductionTypeItemsByCategory = createSelector(
  [
    selectPerProductionTypeItems,
    (state, category) => {
      return category;
    },
  ],
  (perProductionTypeItems, category) => {
    return perProductionTypeItems.find((item) => {
      return item.key === category;
    });
  },
);
export const selectPerUnitItemOfCurrentCategoryByEicCode = createSelector(
  [
    selectPerUnitItemsByEicCodeOfCurrentCategory,
    (state, eicCode) => {
      return eicCode;
    },
  ],
  (perUnitItems, eicCode) => {
    const newUnavailabilities = perUnitItems.find((fd) => {
      return fd.key === eicCode;
    });
    if (_.isUndefined(newUnavailabilities)) {
      return [];
    }
    return newUnavailabilities.values[0];
  },
);

export const selectProductionOfCurrentCategoryByEicCode = createSelector(
  [
    selectPerUnitItemsByEicCodeOfCurrentCategory,
    (state, eicCode) => {
      return eicCode;
    },
  ],
  (items, eicCode) => {
    return items.find((fd) => {
      return fd.key === eicCode;
    }).values[0];
  },
);
export const selectProductionByProductionUnit = createSelector(
  [
    selectPerUnitItemsByProductionUnitOfCurrentCategory,
    (state, productionUnit) => {
      return productionUnit;
    },
  ],
  (items, productionUnit) => {
    const result = items
      .find((item) => {
        return item.key === productionUnit;
      })
      .values.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.lastProduction.value;
      }, 0);
    return result >= 0 ? result : 0;
  },
);
