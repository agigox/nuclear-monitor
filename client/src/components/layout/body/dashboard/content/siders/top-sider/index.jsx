import { Col, Row } from 'antd';
import React from 'react';
import Buttons from '../../../../../../utils/Buttons';
import TopSiderBody from './TopSiderBody';

function TopSider() {
  return (
    <Row>
      <Col>
        <TopSiderBody />
      </Col>
      <Col>
        <Buttons styling="summary">Part de capacité disponible : 68 %</Buttons>
      </Col>
    </Row>
  );
}

export default TopSider;
