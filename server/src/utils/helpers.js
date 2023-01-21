import _ from 'lodash';
import { assocPath } from 'ramda';
import {
  ProductionTypes,
  ProductionCategories,
} from '../enums/productionTypes';
import { ValidationError } from './errors';

export const normalizePort = (port) => {
  const normalizedPort = Number(port);
  if (Number.isNaN(port)) {
    throw new Error('Bad port for server');
  }
  return normalizedPort;
};

export const readCSV = (string) => {
  const lines = string.split('\n').map((l) => l.split(','));
  lines.pop();
  const headers = lines.shift();

  return lines.map((line) =>
    line.reduce(
      (object, cell, i) =>
        Object.assign(object, {
          [headers[i]]: cell,
        }),
      {},
    ),
  );
};

export const setTimeoutPromise = (f, ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      f().then(resolve).catch(reject);
    }, ms);
  });

export const retryWrapper = (f, { retryInterval, retryCount, name = '' }) => {
  let index = 0;
  return function retryWrapped(...args) {
    if (index > 0) {
      // eslint-disable-next-line no-console
      console.log(`Retry ${name}`);
    }

    return f(...args).catch((err) => {
      if (index >= retryCount) {
        throw err;
      }

      return setTimeoutPromise(() => {
        index += 1;
        return retryWrapped(...args);
      }, retryInterval);
    });
  };
};

/*
 * Encapsulate Joi https://github.com/hapijs/joi/blob/v13.0.2/API.md
 */

export const transformJoiError = (joiError) =>
  joiError.details.reduce(
    (acc, detail) => assocPath(detail.path, detail.message, acc),
    {},
  );

export const assertInput = (schema, inputValue) => {
  const { error, value } = schema.validate(inputValue, { abortEarly: false });
  if (error) {
    const errors = transformJoiError(error);
    throw new ValidationError(errors, inputValue);
  }
  return value;
};
export const groupByKey = (array, key) =>
  _.chain(array)
    // Group the elements of Array based on `key` property
    .groupBy(key)
    // `key` is group's name (color), `value` is the array of objects
    .map((value, mapKey) => ({ key: mapKey, values: value }))
    .value();

export function partitionArray(array, isValid) {
  return array.reduce(
    ([fullyDown, partiallyDown], elem) =>
      isValid(elem)
        ? [[...fullyDown, elem], partiallyDown]
        : [fullyDown, [...partiallyDown, elem]],
    [[], []],
  );
}

export const fullPartialSplit = (array) => {
  const valuesSumed = array.map((item) => {
    const unavailableCapacitySum = item.values.reduce(
      (a, b) => a + b.unavailable_capacity,
      0,
    );
    const availableCapacitySum = item.values.reduce(
      (a, b) => a + b.available_capacity,
      0,
    );
    return { ...item, availableCapacitySum, unavailableCapacitySum };
  });
  const [fullyDown, partiallyDown] = partitionArray(
    valuesSumed,
    (e) => e.availableCapacitySum === 0,
  );
  return {
    partiallyDown,
    fullyDown,
  };
};

// eslint-disable-next-line consistent-return
export const getProductionCategory = (productionCategory) => {
  if (
    [
      ProductionTypes.FOSSIL_BROWN_COAL_LIGNITE,
      ProductionTypes.FOSSIL_COAL_DERIVED_GAS,
      ProductionTypes.FOSSIL_GAS,
      ProductionTypes.FOSSIL_HARD_COAL,
      ProductionTypes.FOSSIL_OIL,
      ProductionTypes.FOSSIL_OIL_SHALE,
      ProductionTypes.FOSSIL_PEAT,
    ].includes(productionCategory)
  ) {
    return ProductionCategories.FOSSIL;
  }
  if (
    [
      ProductionTypes.HYDRO_PUMPED_STORAGE,
      ProductionTypes.HYDRO_RUN_OF_RIVER_AND_POUNDAGE,
      ProductionTypes.HYDRO_WATER_RESERVOIR,
    ].includes(productionCategory)
  ) {
    return ProductionCategories.HYDRAULICS;
  }
  if (
    [ProductionTypes.WIND_OFFSHORE, ProductionTypes.WIND_ONSHORE].includes(
      productionCategory,
    )
  ) {
    return ProductionCategories.WIND;
  }
  return productionCategory;
};
