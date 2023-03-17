import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loadPmaxFail, loadPmaxSuccess } from '../redux/reducers/pmaxReducer';
import { loadDataFail, loadDataSuccess } from '../redux/reducers/dataReducer';
import {
  loadReferentielFail,
  loadReferentielSuccess,
} from '../redux/reducers/referentielReducer';

const { REACT_APP_NUKE_API } = process.env;

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_NUKE_API }),
  endpoints: (builder) => {
    return {
      getPokemonByName: builder.query({
        query: (name) => {
          return `pokemon/${name}`;
        },
      }),
      getData: builder.query({
        query: (url) => {
          return url;
        },
        async onQueryStarted(url, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            // `onSuccess` side-effect
            if (url === 'referentiel') {
              dispatch(loadReferentielSuccess(data));
            } else if (url === 'data') {
              dispatch(loadDataSuccess(data));
            } else if (url === 'pmax') {
              dispatch(loadPmaxSuccess(data));
            }
          } catch (err) {
            // `onError` side-effect
            if (url === 'referentiel') {
              dispatch(loadReferentielFail(err));
            } else if (url === 'data') {
              dispatch(loadDataFail(err));
            } else if (url === 'pmax') {
              dispatch(loadPmaxFail(err));
            }
          }
        },
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetDataQuery } = pokemonApi;
