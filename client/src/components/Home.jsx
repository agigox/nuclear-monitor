/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Main from './Main';
import Error from './Error';
import Overview from './overview/Overview';
import ModeSwitcher from './ModeSwitcher';

function Home() {
  const error = useSelector((state) => state.unavailabilities.error);
  const success = (
    <Row gutter={{ xs: 0, sm: 0, md: 20, lg: 20 }}>
      <Col lg={6} md={12} sm={24} xs={24}>
        <Overview />
      </Col>
      <Col lg={18} md={12} sm={24} xs={24}>
        <ModeSwitcher />
        <Main />
      </Col>
    </Row>
  );
  return <>{error ? <Error error={error} /> : success}</>;
}

export default Home;
