/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment-timezone';
import { referentiel } from '../data';
import { getRessource } from '../rteApi';

const PRODUCTIONS_PER_UNIT_RESSOURCE =
  'actual_generation/v1/actual_generations_per_unit';
const UNAVAILABILITIES_RESSOURCE =
  'unavailability_additional_information/v4/generation_unavailabilities';

export const getProductions = async (input, { rteToken }) => {
  const now = moment().tz('Europe/Paris');
  const params = {
    start_date: moment(now).startOf('day').format(),
    end_date: moment(now).startOf('day').add(1, 'day').format(),
  };

  const responseProd = await getRessource({
    ressource: PRODUCTIONS_PER_UNIT_RESSOURCE,
    params,
    token: rteToken,
  });
  const responseDispo = await getRessource({
    ressource: UNAVAILABILITIES_RESSOURCE,
    params: { ...params, status: 'ACTIVE', last_version: true },
    token: rteToken,
  });
  const productions = referentiel.map((item) => {
    let production = responseProd.actual_generations_per_unit.find(
      (elt) => elt.unit.eic_code === item.eicProd,
    );
    let unavailabilities = responseDispo.generation_unavailabilities.filter(
      (elt) =>
        [item.eicIndispoCentral, item.eicIndispoGroup].includes(
          elt.unit.eic_code,
        ),
    );
    if (!_.isUndefined(production)) {
      const capacity = production.values.sort(
        (a, b) =>
          new Date(b.end_date).getTime() - new Date(a.end_date).getTime(),
      )[0].value;
      item.productionCapacity = capacity < 0 ? 0 : capacity;
    } else {
      production = {};
    }
    // si dans un même réacteur, on a deux indisponibilité ou plus
    // on prend une seule en considération est dont updated_date
    // est plus recente
    let unavailability = {};
    if (unavailabilities.length >= 2) {
      const sorted = unavailabilities.sort(
        (a, b) => new Date(b.updated_date) - new Date(a.updated_date),
      );
      unavailabilities = _.uniqBy(sorted, 'unit.name');
      unavailability = { ...unavailabilities[0] };
    }
    if (unavailabilities.length !== 0) {
      item.unavailableCapacity = unavailabilities.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.values[0].unavailable_capacity,
        0,
      );

      unavailability = { ...unavailabilities[0] };
    }
    item.availableCapacity = item.pmax - item.unavailableCapacity;
    return {
      ...item,
      production,
      unavailability,
    };
  });
  return {
    length: productions.length,
    items: productions,
  };
};
