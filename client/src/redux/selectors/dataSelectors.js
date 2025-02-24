import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import { groupByKey } from '../../utils';
import { selectCurrentCategory } from './crossSelectors';

// eslint-disable-next-line import/prefer-default-export
export const selectItemsPerProductionUnit = (state) => {
  // debugger;
  return state.data.itemsPerProductionUnit;
};
export const selectItemsPerProductionType = (state) => {
  // debugger;
  return state.data.itemsPerProductionType;
};
export const selectDataError = (state) => {
  return state.data.error;
};
export const selectLastRefreshHour = (state) => {
  return state.data.lastRefreshHour;
};

export const selectDataByProductionCategory = createSelector(
  [selectItemsPerProductionUnit],
  (items) => {
    const dataByCategory = groupByKey(items, 'productionCategory');
    dataByCategory.unshift({ key: 'ALL', values: items });

    return dataByCategory;
  },
);
export const selectItemsByProductionCategory = createSelector(
  [selectItemsPerProductionType],
  (items) => {
    const dataByCategory = groupByKey(items, 'productionCategory');

    return dataByCategory;
  },
);
export const selectDataByProductionUnit = createSelector(
  [selectItemsPerProductionUnit],
  (items) => {
    const dataByUnit = groupByKey(items, 'productionUnit');
    dataByUnit.unshift({ key: 'ALL', values: items });

    return dataByUnit;
  },
);

export const selectDataByProductionCategoryAndProductionUnit = createSelector(
  [
    selectDataByProductionCategory,
    (state, category) => {
      return category;
    },
  ],
  (items, category) => {
    const { key, values } = items.find((item) => {
      return item.key === category;
    });

    return {
      key,
      values: groupByKey(
        _.orderBy(values, 'productionUnit', 'asc'),
        'productionUnit',
      ),
    };
  },
);
export const selectDataByFieldAndProductionUnit = createSelector(
  [
    selectDataByProductionCategory,
    (state, category) => {
      return category;
    },
  ],
  (items, category) => {
    const { key, values } = items.find((item) => {
      return item.key === category;
    });
    const valuesField = [];
    const valuesBilan = [];
    values.forEach((item) => {
      if (_.isEmpty(item.bilan)) {
        valuesField.push(item);
      } else {
        valuesBilan.push(item);
      }
    });
    return {
      key,
      valuesField: groupByKey(
        _.orderBy(valuesField, 'productionUnit', 'asc'),
        'groupedByField',
      ),
      valuesBilan: groupByKey(
        _.orderBy(valuesBilan, 'productionUnit', 'asc'),
        'bilan.bilanName',
      ),
    };
  },
);
export const selectDataByProductionCategoryAndRegroupementHydro =
  createSelector(
    [
      selectDataByProductionCategory,
      (state, category) => {
        return category;
      },
    ],
    (items, category) => {
      const { key, values } = items.find((item) => {
        return item.key === category;
      });
      const a = _.orderBy(
        groupByKey(values, 'regroupementHydro'),
        'key',
        'asc',
      );
      const b = a.map((item) => {
        return {
          key: item.key,
          values: groupByKey(item.values, 'productionUnit'),
        };
      });
      return {
        key,
        values: b,
      };
    },
  );
/*----------*/

export const selectCategoryUnavailabilities = createSelector(
  [selectDataByProductionCategory, selectCurrentCategory],
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

export const selectCurrentUnavailable = createSelector(
  [selectDataByProductionCategory, selectCurrentCategory],
  (groupedReferentiel, currentCategory) => {
    const currentRef = groupedReferentiel.find((item) => {
      return item.key === currentCategory;
    });
    const unavailable = currentRef.values.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.unavailableCapacity;
      },
      0,
    );
    const available = currentRef.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.availableCapacity;
    }, 0);
    return { unavailable, available };
  },
);
export const selectCurrentProduction = createSelector(
  [selectItemsByProductionCategory, selectCurrentCategory],
  (items, currentCategory) => {
    const currentProd = items.find((item) => {
      return item.key === currentCategory;
    });
    if (_.isUndefined(currentProd)) {
      return 0;
    }
    const production = currentProd.values.reduce(
      (accumulator, currentValue) => {
        const prodValue =
          currentValue.production.value >= 0
            ? currentValue.production.value
            : 0;
        return accumulator + prodValue;
      },
      0,
    );
    return production;
  },
);

export const selectCurrentPmax = createSelector(
  [selectDataByProductionCategory, selectCurrentCategory],
  (groupedReferentiel, currentCategory) => {
    const currentRef = groupedReferentiel.find((item) => {
      return item.key === currentCategory;
    });
    const pmax = currentRef.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.pmax;
    }, 0);
    return pmax;
  },
);
export const selectProductionByCategory = createSelector(
  [
    selectItemsByProductionCategory,
    (state, category) => {
      return category;
    },
  ],
  (items, category) => {
    const currentProd = items.find((item) => {
      return item.key === category;
    });
    if (_.isUndefined(currentProd)) {
      return 0;
    }
    const production = currentProd.values.reduce(
      (accumulator, currentValue) => {
        const prodValue =
          currentValue.production.value >= 0
            ? currentValue.production.value
            : 0;
        return accumulator + prodValue;
      },
      0,
    );
    return production;
  },
);
export const selectPmaxByCategory = createSelector(
  [
    selectDataByProductionCategory,
    (state, category) => {
      return category;
    },
  ],
  (groupedReferentiel, category) => {
    const currentRef = groupedReferentiel.find((item) => {
      return item.key === category;
    });
    const pmax = currentRef.values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.pmax;
    }, 0);
    return pmax;
  },
);
