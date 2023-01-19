/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import moment from 'moment-timezone';
import _ from 'lodash';
import { getRessource } from '../rteApi';
import { groupByKey } from '../utils/helpers';

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
  const withUnderscore = response.map(({ production_type, ...item }) => ({
    ...item,
    production_type: production_type.split('-').join('_'),
  }));
  const groupedByProductionType = groupByKey(withUnderscore, 'production_type');

  return {
    length: groupedByProductionType.length,
    items: groupedByProductionType,
  };
};
