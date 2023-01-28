import { Col, Row } from 'antd';
import React from 'react';
import TopSiderBody from './TopSiderBody';
import TopSiderButtons from './TopSiderButtons';

function TopSider() {
  return (
    <Row gutter={[0, 27]}>
      <Col span={24}>
        <TopSiderBody />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <TopSiderButtons />
      </Col>
    </Row>
  );
}

export default TopSider;
