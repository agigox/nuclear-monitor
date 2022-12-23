import moment from 'moment-timezone';

import { assertInput } from '../utils/helpers';
import { getRessource } from '../rteApi';

// import DateInput from './types';

 export const getUnavailabilities = async (input, { rteToken }) => {
  // const dateInput = assertInput(DateInput, input);
  const date = moment().tz('Europe/Paris');
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

