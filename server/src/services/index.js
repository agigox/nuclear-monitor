import moment from 'moment-timezone';

// import { assertInput } from '../utils/helpers';
import _ from 'lodash';
import { getRessource } from '../rteApi';

import { plants, reactors } from '../data';

// import DateInput from './types';

const UNAVAILABILITIES_RESSOURCE =
  'unavailability_additional_information/v4/generation_unavailabilities';

// eslint-disable-next-line no-shadow
const handleData = (data) => {
  const resultApi = [];
  const groupedData = _.groupBy(data, 'name');
  const keys = Object.keys(groupedData);

  keys.forEach((key) => {
    if (groupedData[key].length >= 2) {
      const sorted = groupedData[key].sort(
        (a, b) => new Date(b.updatedDate) - new Date(a.updatedDate),
      );
      const uniqData = _.uniqBy(sorted, 'name');
      groupedData[key] = [...uniqData];
    }
  });

  let result = [];
  keys.forEach((elt) => {
    result = [...result, ...groupedData[elt]];
  });
  const a = result.map((e) => ({
    ...e,
    name: e.name.slice(0, -2).replace(' ', '_'),
  }));

  const groupedSecond = _.groupBy(a, 'name');
  Object.keys(groupedSecond).forEach((elt) => {
    const reactor = groupedSecond[elt];
    const plant = plants.find((plantElt) => plantElt.id === elt).name;
    const total = parseInt(
      plants.find((plantElt) => plantElt.id === elt).reactorsNumber,
      10,
    );
    const forced = reactor.filter(
      (r) => r.type === 'FORCED_UNAVAILABILITY',
    ).length;
    const planned = reactor.filter(
      (r) => r.type === 'PLANNED_MAINTENANCE',
    ).length;
    const power = reactor.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.installedCapacity,
      0,
    );
    const toPush = {
      plant,
      total,
      availabilities: total - forced - planned,
      unavailabilities: {
        forced,
        planned,
        power,
      },
    };
    const productionUnit = reactor.find(
      (r) => r.unitType === 'PRODUCTION_UNIT',
    );
    if (!_.isUndefined(productionUnit)) {
      toPush.availabilities = 0;
      toPush.unavailabilities.forced = total;
      toPush.unavailabilities.planned = 0;
    }
    resultApi.push(toPush);
  });

  return resultApi;
};
// eslint-disable-next-line import/prefer-default-export
export const getUnavailabilities = async (input, { rteToken }) => {
  // const dateInput = assertInput(DateInput, input);
  const date = moment().tz('Europe/Paris');
  const now = moment().tz('Europe/Paris');
  const params = {
    start_date: moment(date).startOf('day').format(),
    end_date: moment(date).startOf('day').add(1, 'day').format(),
    status: 'ACTIVE',
    last_version: true,
  };

  const data = await getRessource({
    ressource: UNAVAILABILITIES_RESSOURCE,
    params,
    token: rteToken,
  });
  const unavailabilitiesToApi = data.generation_unavailabilities
    .filter((unavailability) => {
      const {
        start_date: startDate,
        end_date: endDate,
        production_type: productionType,
      } = unavailability;
      const isValiderData =
        (productionType === 'NUCLEAR' && now.isBetween(startDate, endDate)) ||
        now.isSame(startDate) ||
        now.isSame(endDate);
      return isValiderData;
    })
    .map((reactor) => ({
      type: reactor.type,
      eicCodeProducer: reactor.eic_code_producer,
      unitType: reactor.unit.type,
      name: reactor.unit.name,
      updatedDate: reactor.updated_date,
      installedCapacity: reactor.unit.installed_capacity,
    }));
  const unavailabilities = handleData(unavailabilitiesToApi);
  const forced = unavailabilities.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.unavailabilities.forced,
    0,
  );
  const planned = unavailabilities.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.unavailabilities.planned,
    0,
  );
  const totalPower = reactors.reduce(
    (accumulator, currentValue) => accumulator + currentValue.netPower_MW,
    0,
  );
  const unavailablePower = unavailabilities.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.unavailabilities.power,
    0,
  );
  const res = {
    overview: {
      available: reactors.length - forced - planned,
      unavailable: {
        forced,
        planned,
      },
      totalNumber: reactors.length,
      totalPower,
      unavailablePower,
    },
    unavailabilities,
  };

  return res;
};
