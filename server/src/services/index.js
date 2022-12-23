const moment = require('moment-timezone');

const { assertInput } = require('../utils/helpers');
const { getRessource } = require('../rteApi');

const { DateInput } = require('./types');

async function getProductions(input, { rteToken, logger, cache }) {
  const dateInput = assertInput(DateInput, input);
  const date = moment(dateInput.date).tz('Europe/Paris');
  const now = moment().tz('Europe/Paris');
  const isToday = date.isSame(now, 'day');
  const isCitrouille = isToday && now.hours() <= 2;

  const key = `PROD-${date.format('YYYY-MM-DD-HH')}`;
  const cacheRes = cache.getValue(key);

  if (cacheRes) {
    logger.info('getProductions: cache HIT');
    // return cacheRes;
  }

  const data = await getRessource({
    ressource: 'actual_generation/v1/actual_generations_per_unit',
    params: {
      start_date: moment(date)
        .startOf('day')
        .subtract(isCitrouille ? 1 : 0, 'day')
        .format(),
      end_date: moment(date)
        .startOf('day')
        .add(isToday ? 1 : 2, 'day')
        .format(),
    },
    token: rteToken,
  });
  const offset = isCitrouille ? 23 : 0;

  const productions = data.actual_generations_per_unit
    .filter(d => d.unit.production_type === 'NUCLEAR')

    .map(reactor => ({
      eicCode: reactor.unit.eic_code,
      values: reactor.values.slice(offset, 25 + offset).map(value => ({
        startDate: value.start_date,
        endDate: value.end_date,
        updatedDate: value.updated_date,
        value: value.value,
      })),
    }));

  const res = {
    date: date.format('YYYY-MM-DD'),
    productions,
  };

  cache.setValue(key, res, 5 * 60 * 1000);

  return res;
}

async function getUnavailabilities(input, { rteToken }) {
  const dateInput = assertInput(DateInput, input);
  const date = moment(dateInput.date).tz('Europe/Paris');
  const now = moment().tz('Europe/Paris');
  const ressource =
    'unavailability_additional_information/v4/generation_unavailabilities';
  const params = {
    start_date: moment(date)
      .startOf('day')
      .format(),
    end_date: moment(date)
      .startOf('day')
      .add(1, 'day')
      .format(),
    status: 'ACTIVE',
    last_version: true,
  };

  const data = await getRessource({
    ressource,
    params,
    token: rteToken,
  });

  const plants = [
    {
      id: 'BELLEVILLE',
      number: 2,
    },
    {
      id: 'BLAYAIS',
      number: 4,
    },
    {
      id: 'BUGEY',
      number: 4,
    },
    {
      id: 'CATTENOM',
      number: 4,
    },
    {
      id: 'CHINON',
      number: 4,
    },
    {
      id: 'CHOOZ',
      number: 2,
    },
    {
      id: 'CIVAUX',
      number: 2,
    },
    {
      id: 'CRUAS',
      number: 4,
    },
    {
      id: 'DAMPIERRE',
      number: 4,
    },
    {
      id: 'FESSENHEIM',
      number: 2,
    },
    {
      id: 'FLAMANVILLE',
      number: 2,
    },
    {
      id: 'GOLFECH',
      number: 2,
    },
    {
      id: 'GRAVELINES',
      number: 6,
    },
    {
      id: 'Nogent',
      number: 2,
    },
    {
      id: 'PALUEL',
      number: 4,
    },
    {
      id: 'PENLY',
      number: 2,
    },
    {
      id: 'ST ALBAN',
      number: 2,
    },
    {
      id: 'ST LAURENT',
      number: 2,
    },
    {
      id: 'TRICASTIN',
      number: 2,
    },
  ];

  const unavailibilities = data.generation_unavailabilities
    .filter(reactor => {
      // eslint-disable-next-line camelcase
      const { start_date, end_date, production_type } = reactor;
      const isValidSearch =
        now.isBetween(start_date, end_date) ||
        now.isSame(start_date) ||
        now.isSame(end_date);
      // eslint-disable-next-line camelcase
      return production_type === 'NUCLEAR' && isValidSearch;
    })
    .map(reactor => ({
      eicCode: reactor.unit.eic_code,
      type: reactor.type,
      eicCodeProducer: reactor.eic_code_producer,
      name: reactor.unit.name.slice(0, -2),
    }))
    .reduce((r, a) => {
      // eslint-disable-next-line no-param-reassign
      r[a.name] = r[a.name] || [];
      r[a.name].push(a);
      return r;
    }, Object.create(null));
  const result = Object.keys(unavailibilities).map(central => {
    const obj = unavailibilities[central];
    const unavailibility = obj.reduce((r, a) => {
      // eslint-disable-next-line no-param-reassign
      r[a.type] = r[a.type] || [];
      r[a.type].push(a);
      return r;
    }, Object.create(null));
    const availibility = plants.find(plant => plant.id === central).number;
    const tmp = { availibility, central, unavailibility };
    return tmp;
  });

  const res = {
    unavailibilities: result,
  };

  return res;
}

module.exports = {
  getProductions,
  getUnavailabilities,
};
