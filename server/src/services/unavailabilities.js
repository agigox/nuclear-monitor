/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import moment from 'moment-timezone';
import _ from 'lodash';
import { getRessource } from '../rteApi';
import {
  fullPartialSplit,
  groupByKey,
  getProductionCategory,
} from '../utils/helpers';
import { ProductionCategories } from '../enums/productionTypes';

const UNAVAILABILITIES_RESSOURCE =
  'unavailability_additional_information/v4/generation_unavailabilities';

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
      unit,
      values,
      reason: item.reason,
      productionType,
      productionCategory,
    };
  });
  const dataGroupedByProductionCategory = groupByKey(
    dataWithUnderscore,
    'productionCategory',
  ).filter((item) => item.key !== ProductionCategories.OTHER);
  const tmp = dataGroupedByProductionCategory.map((item) => {
    const valuesOfDataGroupedByProductionType = item.values;
    const a = groupByKey(valuesOfDataGroupedByProductionType, 'productionType');
    const newValues = [...a];
    console.log(item.key);

    // const a = valuesOfDataGroupedByProductionType.map
    return {
      key: item.key,
      values: newValues,
    };
  });

  // group data by production type and get [{key: '', values: ''}]
  const dataGroupedByProductionType = groupByKey(
    dataWithUnderscore,
    'productionType',
  );
  // group the values property of the result by unit name
  // eslint-disable-next-line no-unused-vars
  const dataGroupedByProductionTypeAndUnitName =
    dataGroupedByProductionType.map((item) => {
      const valuesOfDataGroupedByProductionType = item.values;
      const valuesGroupedByUnitName = groupByKey(
        valuesOfDataGroupedByProductionType,
        'unit.name',
      );

      // divide the result to fullyDown and partiallyDown
      const valuesGroupedByUnitNamePartitioned = valuesGroupedByUnitName.map(
        (val) => ({
          ...val,
          partition: fullPartialSplit(val.values),
        }),
      );
      // return the final result
      return {
        key: item.key,
        values: valuesGroupedByUnitNamePartitioned,
      };
    });

  return {
    length: tmp.length,
    items: tmp,
  };
};
