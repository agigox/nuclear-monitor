/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import moment from 'moment-timezone';
import _ from 'lodash';
import { getRessource } from '../rteApi';
import { fullPartialSplit, groupByKey } from '../utils/helpers';

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

  const data = await getRessource({
    ressource: UNAVAILABILITIES_RESSOURCE,
    params,
    token: rteToken,
  });
  const response = data.generation_unavailabilities;
  // replace production_type with - by _
  // for example, we get from the API HYDRO_RUN-OF-RIVER_AND_POUNDAGE instead of HYDRO_RUN_OF_RIVER_AND_POUNDAGE
  // and get only necessary data from api
  const dataWithUnderscore = response.map(({ production_type, ...item }) => ({
    creationDate: item.creation_date,
    updatedDate: item.updated_date,
    startDate: item.start_date,
    endDate: item.end_date,
    unit: _.cloneDeep(item.unit),
    values: _.cloneDeep(item.values),
    reason: item.reason,
    productionType: production_type.split('-').join('_'),
  }));
  // group data by production type and get [{key: '', values: ''}]

  const dataGroupedByProductionType = groupByKey(
    dataWithUnderscore,
    'productionType',
  );
  // group the values property of the result by unit name
  const dataGroupedByProductionTypeAndUnitName =
    dataGroupedByProductionType.map((item) => {
      const valuesOfDataGroupedByProductionType = item.values;
      // si dans un même réacteur, on a deux indisponibilité ou plus
      // on prend une seule en considération est dont updated_date
      // est plus recente

      /*
      if (valuesOfDataGroupedByProductionType.length >= 2) {
          const sorted = valuesOfDataGroupedByProductionType.sort(
            (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate),
          );
          const uniqData = _.uniqBy(sorted, 'name');
          valuesOfDataGroupedByProductionType = [...uniqData];
        }
      valuesOfDataGroupedByProductionType.forEach((key) => {
        if (groupedData[key].length >= 2) {
          const sorted = groupedData[key].sort(
            (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate),
          );
          const uniqData = _.uniqBy(sorted, 'name');
          groupedData[key] = [...uniqData];
        }
      });
      */
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
    length: dataGroupedByProductionTypeAndUnitName.length,
    items: dataGroupedByProductionTypeAndUnitName,
  };
};
