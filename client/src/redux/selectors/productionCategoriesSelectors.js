import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectCategoriesRefreshPending = (state) => {
  return state.productionCategories.categoriesRefreshPending;
};
export const selectLength = (state) => {
  return state.productionCategories.length;
};
export const selectItems = (state) =>
  // eslint-disable-next-line no-debugger
  // debugger;
  {
    return state.productionCategories.items;
  };
export const selectItemsPerUnit = (state) => {
  return state.productionCategories.items.itemsPerUnit;
};
export const itemsPerProductionUnit = (state) => {
  return state.productionCategories.items.itemsPerProductionUnit;
};

export const selectError = (state) => {
  return state.productionCategories.error;
};
export const selectLastRefreshDate = (state) => {
  return state.productionCategories.lastRefreshDate;
};

export const selectUnavailabilitiesPerUnitOfCurrentCategory = createSelector(
  [selectCurrentCategory, selectItems],
  (category, items) => {
    return items.find((item) => {
      return item.key === category;
    }).itemsPerUnit;
  },
);

export const selectUnavailabilitiesPerProductionUnitOfCurrentCategory =
  createSelector([selectCurrentCategory, selectItems], (category, items) => {
    return items.find((item) => {
      return item.key === category;
    }).itemsPerProductionUnit;
  });

export const selectUnavailabilitiesByCategoryCapacity = createSelector(
  [
    selectItems,
    (state, category) => {
      return category;
    },
  ],
  (items, category) => {
    const unavailabilities = items.find((item) => {
      return item.key === category;
    }).itemsPerUnit;
    return unavailabilities.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.unavailability.unavailable_capacity;
    }, 0);
  },
);
export const selectUnavailabilityByProductionUnit = createSelector(
  [
    selectUnavailabilitiesPerProductionUnitOfCurrentCategory,
    (state, productionUnit) => {
      return productionUnit;
    },
  ],
  (items, productionUnit) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    let capacity = 0;
    const result = items.find((item) => {
      return item.key === productionUnit;
    });
    if (!_.isUndefined(result)) {
      capacity = result.values.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.unavailability.unavailable_capacity;
      }, 0);
    }
    return capacity;
  },
);
/** --------------- */
