/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appActions from '../../../redux/actions';
import Loading from './Loading';
import Dashboard from './dashboard';
import Error from './Error';

function Body() {
  const loadings = useSelector((state) => state.unavailabilities.loadings);
  const error = useSelector((state) => state.unavailabilities.error);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      dispatch(appActions.unavailabilitiesActions.loadUnavailabilities());
      dispatch(appActions.referentielActions.loadReferentiel());
      dispatch(
        appActions.productionCategoriesActions.loadProductionCategories(),
      );
    };

    loadData();
  }, []);
  if (loadings.unavailabilities) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }
  return <Dashboard />;
}

export default Body;
