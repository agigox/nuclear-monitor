/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Loading from './Loading';
import Dashboard from './dashboard';
import Error from './Error';
import { useGetDataQuery } from '../../../api/pokemon';

function Body() {
  const [loadingUI, setLoadingUI] = useState(true);
  const [errorUI, setErrorUI] = useState(undefined);
  const [dataUI, setDataUI] = useState(undefined);
  const {
    data: dataReferentiel,
    error: errorReferentiel,
    isFetching: isReferentielLoading,
  } = useGetDataQuery('referentielv1');

  const {
    data: dataProductionCategories,
    error: errorProductionCategories,
    isFetching: isProductionCategoriesLoading,
  } = useGetDataQuery('unavailabilitiesv3');
  const {
    data: dataProductionsPerUnit,
    error: errorProductionsPerUnit,
    isFetching: isProductionsPerUnitLoading,
  } = useGetDataQuery('productions_per_unit');
  const {
    data: dataProductions1,
    error: errorProductions1,
    isFetching: isProductions1Loading,
  } = useGetDataQuery('productions');
  const {
    data: dataProductionsPerProductionType,
    error: errorProductionsPerProductionType,
    isFetching: isProductionsPerProductionTypeLoading,
  } = useGetDataQuery('productions_per_production_type');
  const {
    data: dataPmax,
    error: errorPmax,
    isFetching: isPmaxLoading,
  } = useGetDataQuery('pmax');
  const data =
    dataProductions1 &&
    dataReferentiel &&
    dataProductionCategories &&
    dataProductionsPerUnit &&
    dataProductionsPerProductionType &&
    dataPmax;
  const error =
    errorProductions1 &&
    errorReferentiel &&
    errorProductionCategories &&
    errorProductionsPerUnit &&
    errorProductionsPerProductionType &&
    errorPmax;
  const loading =
    isProductions1Loading &&
    isReferentielLoading &&
    isProductionCategoriesLoading &&
    isProductionsPerUnitLoading &&
    isProductionsPerProductionTypeLoading &&
    isPmaxLoading;

  useEffect(() => {
    setLoadingUI(loading);
    setErrorUI(error);
    setDataUI(data);
  }, [loading, error, data]);
  /*
  if (!_.isUndefined(errorUI)) {
    return <Error error="Error" />;
  }
  if (loadingUI) {
    return <Loading />;
  }
  if (!_.isUndefined(dataUI)) {
    return <Dashboard />;
  }
  return <Dashboard />;
  */
  return (
    <>
      {errorUI ? (
        <Error />
      ) : loadingUI ? (
        <Loading />
      ) : dataUI ? (
        <Dashboard />
      ) : null}
    </>
  );
}

export default Body;
