import { createSelector } from '@reduxjs/toolkit';
import { groupByKey } from '../../utils';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectDataLength = (state) => {
  return state.data.length;
};
export const selectDataItems = (state) => {
  // debugger;
  return state.data.items;
};
export const selectDataError = (state) => {
  return state.data.error;
};

export const selectGroupedUnavailabilitiesByProductionType = createSelector(
  [selectDataItems],
  (items) => {
    const groupByCategory = groupByKey(items, 'category');
    console.log(groupByCategory);
    groupByCategory.unshift({ key: 'ALL', values: items });

    return groupByCategory;
  },
);

export const selectCategoryUnavailabilities = createSelector(
  [selectGroupedUnavailabilitiesByProductionType, selectCurrentCategory],
  (items, category) => {
    return items.find((item) => {
      return item.key === category;
    }).values;
  },
);
export const selectCatgoryFullyDownUnavailabilityNumber = createSelector(
  [selectCategoryUnavailabilities],
  (unavailabilities) => {
    // debugger;
    return unavailabilities.filter((u) => {
      return u.availableCapacity === 0;
    }).length;
  },
);
export const selectCatgoryPartiallyDownUnavailabilityNumber = createSelector(
  [selectCategoryUnavailabilities],
  (unavailabilities) => {
    return unavailabilities.filter((u) => {
      return u.pmax !== u.unavailableCapacity && u.pmax !== u.availableCapacity;
    }).length;
  },
);

export const selectCurrentCapacity = createSelector(
  [selectGroupedUnavailabilitiesByProductionType, selectCurrentCategory],
  (groupedReferentiel, currentCategory) => {
    const currentRef = groupedReferentiel.find((item) => {
      return item.key === currentCategory;
    });
    const production = currentRef.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.productionCapacity;
    }, 0);
    const unavailable = currentRef.values.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.unavailableCapacity;
      },
      0,
    );
    const available = currentRef.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.availableCapacity;
    }, 0);
    return { production, unavailable, available };
  },
);
