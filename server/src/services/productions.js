/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import moment from 'moment-timezone';
import { getRessource } from '../rteApi';
import { groupByKey, getProductionCategory } from '../utils/helpers';

const PRODUCTIONS_PER_UNIT_RESSOURCE =
  'actual_generation/v1/actual_generations_per_production_type';
const h = 'generation_installed_capacities/v1/capacities_per_production_type';

export const getProductions = async (input, { rteToken }) => {
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
