/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import Main from './Main';
import Error from './Error';
import Overview from './overview/Overview';

function Home() {
  const error = useSelector((state) => state.unavailabilities.error);
  const success = (
    <>
      <Overview />
      <Main />
    </>
  );
  return <>{error ? <Error error={error} /> : success}</>;
}

export default Home;
