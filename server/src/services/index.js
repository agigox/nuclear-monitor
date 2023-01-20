import moment from 'moment-timezone';

// import { assertInput } from '../utils/helpers';
import _ from 'lodash';
import { getRessource } from '../rteApi';

import { plants, reactors, plantsUp, referentiel } from '../data';

// import DateInput from './types';

const UNAVAILABILITIES_RESSOURCE =
  'unavailability_additional_information/v4/generation_unavailabilities';

// eslint-disable-next-line no-shadow
const handleData = (data) => {
  const resultApi = [];
  const groupedData = _.groupBy(data, 'name');
  const keys = Object.keys(groupedData);

  // si dans un même réacteur, on a deux indisponibilité ou plus
  // on prend un seul en considération est dont updated_date
  // est plus recente
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
    uniqName: e.name.slice(0, -2).replace(' ', '_'),
  }));

  const groupedSecond = _.groupBy(a, 'uniqName');
  // return groupedSecond;

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
const handleDatav2 = (data) => {
  const resultApi = [];
  const groupedData = _.groupBy(data, 'name');
  const keys = Object.keys(groupedData);

  // si dans un même réacteur, on a deux indisponibilité ou plus
  // on prend une seule en considération est dont updated_date
  // est plus recente
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
    uniqName: e.name.slice(0, -2).replace(' ', '_'),
  }));

  const groupedSecond = _.groupBy(a, 'uniqName');

  Object.keys(groupedSecond)
    .filter((gs) => gs !== 'FESSENHEIM')
    .forEach((elt) => {
      const central = groupedSecond[elt];
      const plant = plants.find((plantElt) => plantElt.id === elt).name;
      const totalArray = reactors
        .filter((reactor) => reactor.plantId === elt)
        .map((reactorData) => ({
          name: reactorData.name,
          installedCapacity: reactorData.netPower_MW,
          availableCapacity: reactorData.netPower_MW,
          unavailableCapacity: 0,
        }));

      const fullyDown = central
        .filter((r) => {
          const availableCapacity = r.values.reduce(
            (sum, current) => current.available_capacity + sum,
            0,
          );
          return availableCapacity === 0;
        })
        .map((fd) => ({
          name: fd.name,
          startDate: fd.startDate,
          endDate: fd.endDate,
          reason: fd.reason,
          updatedDate: fd.updatedDate,
          installedCapacity: fd.installedCapacity,
          availableCapacity: 0,
          unavailableCapacity: fd.installedCapacity,
        }));
      const partiallyDown = central
        .filter((r) => {
          const availableCapacity = r.values.reduce(
            (sum, current) => current.available_capacity + sum,
            0,
          );
          return availableCapacity !== 0;
        })
        .map((pd) => {
          const availableCapacity = pd.values.reduce(
            (sum, current) => current.available_capacity + sum,
            0,
          );
          return {
            name: pd.name,
            startDate: pd.startDate,
            endDate: pd.endDate,
            reason: pd.reason,
            updatedDate: pd.updatedDate,
            installedCapacity: pd.installedCapacity,
            availableCapacity,
            unavailableCapacity: pd.installedCapacity - availableCapacity,
          };
        });
      const downArray = [...fullyDown, ...partiallyDown];

      const unavailablePower = central.reduce((accumulator, currentValue) => {
        const rsl = currentValue.values.reduce(
          (accum, curreVal) => accum + Number(curreVal.unavailable_capacity),
          0,
        );
        return accumulator + rsl;
      }, 0);
      const toPush = {
        plant,
        total: totalArray,
        availabilities: totalArray.filter(
          (val) => !downArray.some((e) => e.name === val.name),
        ),
        unavailabilities: {
          fullyDown,
          partiallyDown,
          unavailablePower,
        },
      };
      /*
      const productionUnit = central.find(
        (r) => r.unitType === 'PRODUCTION_UNIT',
      );
      if (!_.isUndefined(productionUnit)) {
        toPush.availabilities = 0;
        toPush.unavailabilities.forced = total;
        toPush.unavailabilities.planned = 0;
      }
      */

      resultApi.push(toPush);
    });
  // console.log(plantsUp);
  plantsUp.forEach((plantUp) => {
    const isPlantUp = resultApi.find(
      (plantApi) => plantApi.plant === plantUp.plant,
    );
    if (_.isUndefined(isPlantUp)) {
      resultApi.push(plantUp);
    }
  });

  return _.sortBy(resultApi, 'plant');
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
  const unavailabilitiesToApi = data.generation_unavailabilities.filter(
    (unavailability) => {
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
    },
  );
  /*
    .map((reactor) => ({
      type: reactor.type,
      eicCodeProducer: reactor.eic_code_producer,
      unitType: reactor.unit.type,
      name: reactor.unit.name,
      updatedDate: reactor.updated_date,
      installedCapacity: reactor.unit.installed_capacity,
      values: reactor.values,
    }));
    
  const unavailabilities = handleData(unavailabilitiesToApi, 'type');
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
  */
  const res = {
    /*
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
    */
    unavailabilities: unavailabilitiesToApi,
  };

  return res;
};

export const getUnavailabilitiesV2 = async (input, { rteToken }) => {
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
      startDate: reactor.start_date,
      endDate: reactor.end_date,
      reason: reactor.reason,
      name: reactor.unit.name,
      updatedDate: reactor.updated_date,
      installedCapacity: reactor.unit.installed_capacity,
      values: reactor.values,
    }));
  const unavailabilities = handleDatav2(unavailabilitiesToApi);
  const fullyDown = unavailabilities.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.unavailabilities.fullyDown.length,
    0,
  );
  const partiallyDown = unavailabilities.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.unavailabilities.partiallyDown.length,
    0,
  );
  const totalPower = reactors.reduce(
    (accumulator, currentValue) => accumulator + currentValue.netPower_MW,
    0,
  );
  const totalUnavailablePower = unavailabilities.reduce(
    (accumulator, currentValue) =>
      accumulator + Number(currentValue.unavailabilities.unavailablePower),
    0,
  );
  const res = {
    overview: {
      available: reactors.length - fullyDown - partiallyDown,
      unavailable: {
        fullyDown,
        partiallyDown,
      },
      totalNumber: reactors.length,
      totalPower,
      totalUnavailablePower,
    },
    unavailabilities,
  };

  return res;
};
