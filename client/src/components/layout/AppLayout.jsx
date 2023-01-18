/* eslint-disable react/jsx-no-useless-fragment */
import { Col, Row } from 'antd';
import React from 'react';
import Header from './header/Header';
import Body from './body';
import Footer from './footer/Footer';

function AppLayout() {
  return (
    <Row>
      <Col span={24}>
        <Header />
      </Col>
      <Col span={24}>
        <Body />
      </Col>
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  );
}

export default AppLayout;
