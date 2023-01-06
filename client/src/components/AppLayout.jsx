/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appActions from '../redux/actions';
import Loading from './Loading';
import Home from './Home';

function AppLayout() {
  const loadings = useSelector((state) => state.unavailabilities.loadings);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      dispatch(appActions.unavailabilitiesActions.loadUnavailabilities());
    };

    loadData();
  }, []);
  return <>{loadings.unavailabilities ? <Loading /> : <Home />}</>;
}

export default AppLayout;
