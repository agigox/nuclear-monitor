import { Col, Row } from 'antd';
import React from 'react';
import Header from 'components/layout/header/Header';
import Body from 'components/layout/body';
import Footer from 'components/layout/footer/Footer';

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
