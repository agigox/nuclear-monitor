import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loadPmaxFail, loadPmaxSuccess } from '../redux/reducers/pmaxReducer';
import {
  loadProductionCategoriesFail,
  loadProductionCategoriesSuccess,
} from '../redux/reducers/productionCategoriesReducer';
import {
  loadProductionsPerProductionTypeFail,
  loadProductionsPerProductionTypeSuccess,
  loadProductionsPerUnitFail,
  loadProductionsPerUnitSuccess,
} from '../redux/reducers/productionsReducer';
import {
  loadReferentielFail,
  loadReferentielSuccess,
} from '../redux/reducers/referentielReducer';

const { REACT_APP_NUCLEAR_MONITOR_API } = process.env;

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_NUCLEAR_MONITOR_API }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getData: builder.query({
      query: (url) => url,
      async onQueryStarted(url, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          if (url === 'referentiel') {
            dispatch(loadReferentielSuccess(data));
          } else if (url === 'unavailabilitiesv3') {
            dispatch(loadProductionCategoriesSuccess(data));
          } else if (url === 'productions_per_unit') {
            dispatch(loadProductionsPerUnitSuccess(data));
          } else if (url === 'productions_per_production_type') {
            dispatch(loadProductionsPerProductionTypeSuccess(data));
          } else if (url === 'pmax') {
            dispatch(loadPmaxSuccess(data));
          }
        } catch (err) {
          // `onError` side-effect
          if (url === 'referentiel') {
            dispatch(loadReferentielFail(err));
          } else if (url === 'unavailabilitiesv3') {
            dispatch(loadProductionCategoriesFail(err));
          } else if (url === 'productions_per_unit') {
            dispatch(loadProductionsPerUnitFail(err));
          } else if (url === 'productions_per_production_type') {
            dispatch(loadProductionsPerProductionTypeFail(err));
          } else if (url === 'pmax') {
            dispatch(loadPmaxFail(err));
          }
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetDataQuery } = pokemonApi;
