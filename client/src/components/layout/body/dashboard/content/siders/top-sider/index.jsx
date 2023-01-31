import { Col, Row } from 'antd';
import React from 'react';
import TopSiderBody from './TopSiderBody';
import TopSiderButton from './TopSiderButton';

function TopSider() {
  return (
    <Row gutter={[0, 27]}>
      <Col span={24}>
        <TopSiderBody />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <TopSiderButton />
      </Col>
    </Row>
  );
}

export default TopSider;
