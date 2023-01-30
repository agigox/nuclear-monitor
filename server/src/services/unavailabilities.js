/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import moment from 'moment-timezone';
import _ from 'lodash';
import { getRessource } from '../rteApi';
import { groupByKey, getProductionCategory } from '../utils/helpers';
import { ProductionCategories } from '../enums/productionTypes';

const UNAVAILABILITIES_RESSOURCE =
  'unavailability_additional_information/v4/generation_unavailabilities';

const groupDataWithUnderscore = (dataWithUnderscore, category) => {
  let tmp = dataWithUnderscore;
  if (category === 'productionCategory') {
    tmp = groupByKey(dataWithUnderscore, category);
  }
  const dataGroupedByProductionCategory = tmp.filter(
    (item) => item.key !== ProductionCategories.OTHER,
  );
  const finalResult = dataGroupedByProductionCategory.map((item) => {
    let valuesOfDataGroupedByProductionType = item.values;
    const sorted = valuesOfDataGroupedByProductionType.sort(
      (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate),
    );
    const uniqData = _.uniqBy(sorted, 'name').filter(
      (gs) => gs.name.indexOf('FESSENHEIM') === -1,
    );
    valuesOfDataGroupedByProductionType = [...uniqData];
    return {
      key: item.key,
      values: uniqData.map((t) => ({
        ...t,
        unavailability: t.values[0] || {},
      })),
    };
  });
  return finalResult;
};
export const getUnavailabilitiesV3 = async (input, { rteToken }) => {
  const now = moment().tz('Europe/Paris');
  const params = {
    start_date: moment(now).startOf('day').format(),
    end_date: moment(now).startOf('day').add(1, 'day').format(),
    status: 'ACTIVE',
    last_version: true,
  };

  const response = await getRessource({
    ressource: UNAVAILABILITIES_RESSOURCE,
    params,
    token: rteToken,
  });
  const data = response.generation_unavailabilities;

  // replace production_type with - by _
  // for example, we get from the API HYDRO_RUN-OF-RIVER_AND_POUNDAGE instead of HYDRO_RUN_OF_RIVER_AND_POUNDAGE
  // and get only necessary data from api
  const dataWithUnderscore = data.map(({ production_type, ...item }) => {
    const unit = _.cloneDeep(item.unit);
    const values = _.cloneDeep(item.values);
    const productionType = production_type.split('-').join('_');
    const productionCategory = getProductionCategory(productionType);
    return {
      creationDate: item.creation_date,
      updatedDate: item.updated_date,
      startDate: item.start_date,
      endDate: item.end_date,
      name: unit.name,
      eicCode: unit.eic_code,
      values,
      reason: item.reason,
      installedCapacity: unit.installed_capacity,
      productionType,
      productionCategory,
    };
  });
  const finalResult = groupDataWithUnderscore(
    dataWithUnderscore,
    'productionCategory',
  ).filter((gs) => gs.key !== ProductionCategories.WINDS);

  return {
    length: finalResult.length,
    items: finalResult,
  };
};
