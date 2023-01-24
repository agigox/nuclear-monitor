import { Col, Row } from 'antd';
import React from 'react';
import Buttons from '../../../../../../utils/Buttons';
import TopSiderBody from './TopSiderBody';

function TopSider() {
  return (
    <Row gutter={[0, 27]}>
      <Col span={24}>
        <TopSiderBody />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons styling="summary">Part de capacité disponible : 68 %</Buttons>
      </Col>
    </Row>
  );
}

export default TopSider;
