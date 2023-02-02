/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment-timezone';
import { referentiel } from '../data';
import { getRessource } from '../rteApi';
import { groupByKey, getProductionCategory } from '../utils/helpers';

const PRODUCTIONS_PER_PRODUCTION_TYPE_RESSOURCE =
  'actual_generation/v1/actual_generations_per_production_type';
const PRODUCTIONS_PER_UNIT_RESSOURCE =
  'actual_generation/v1/actual_generations_per_unit';

export const getProductionsPerProductionType = async (input, { rteToken }) => {
  const now = moment().tz('Europe/Paris');
  const params = {
    start_date: moment(now).startOf('day').format(),
    end_date: moment(now).startOf('day').add(1, 'day').format(),
  };

  const response = await getRessource({
    ressource: PRODUCTIONS_PER_PRODUCTION_TYPE_RESSOURCE,
    params,
    token: rteToken,
  });

  const productions = response.actual_generations_per_production_type.map(
    ({ start_date, end_date, production_type, values }) => ({
      startDate: start_date,
      endDate: end_date,
      unitProductionType: production_type,
      unitProductionCategory: getProductionCategory(production_type),
      lastProduction: values.sort(
        (a, b) =>
          new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
      )[0],
    }),
  );
  const productionsGroupedByCategory = groupByKey(
    productions,
    'unitProductionCategory',
  );
  const sumedProduction = productionsGroupedByCategory.map(
    ({ key, values }) => ({
      key,
      values,
      lastProduction: values.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.lastProduction.value,
        0,
      ),
    }),
  );
  return {
    length: sumedProduction.length,
    items: sumedProduction,
  };
};

export const getProductionsPerUnit = async (input, { rteToken }) => {
  const now = moment().tz('Europe/Paris');
  const params = {
    start_date: moment(now).startOf('day').format(),
    end_date: moment(now).startOf('day').add(1, 'day').format(),
  };

  const response = await getRessource({
    ressource: PRODUCTIONS_PER_UNIT_RESSOURCE,
    params,
    token: rteToken,
  });

  const productions = response.actual_generations_per_unit
    .map(({ start_date, end_date, unit, values }) => {
      let unitProductionUnit = 'NOPLANT';
      const tmp = referentiel.find((item) => item.eicCode === unit.eic_code);
      if (!_.isUndefined(tmp)) {
        unitProductionUnit = tmp.plantId;
      }
      return {
        startDate: start_date,
        endDate: end_date,
        unitEicCode: unit.eic_code,
        unitName: unit.name,
        unitProductionType: unit.production_type,
        unitProductionCategory: getProductionCategory(unit.production_type),
        unitProductionUnit,
        lastProduction: values.sort(
          (a, b) =>
            new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
        )[0],
      };
    })
    .filter((item) => item.unitProductionUnit !== 'NOPLANT');
  const productionsGroupedByCategory = groupByKey(
    productions,
    'unitProductionCategory',
  );
  const productionsGroupedByCategoryAndEicCode =
    productionsGroupedByCategory.map((item) => ({
      key: item.key,
      values: groupByKey(item.values, 'unitEicCode'),
    }));
  const productionsGroupedByCategoryAndProductionUnitName =
    productionsGroupedByCategory.map((item) => ({
      key: item.key,
      values: groupByKey(item.values, 'unitProductionUnit'),
    }));
  return {
    lengthEic: productionsGroupedByCategoryAndEicCode.length,
    itemsByEicCode: productionsGroupedByCategoryAndEicCode,
    lengthProductionUnit:
      productionsGroupedByCategoryAndProductionUnitName.length,
    itemsByProductionUnit: productionsGroupedByCategoryAndProductionUnitName,
  };
};
