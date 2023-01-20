import { Button, Col, Row } from 'antd';
import React from 'react';
import TopSiderBody from './TopSiderBody';

function TopSider() {
  return (
    <Row>
      <Col>
        <TopSiderBody />
      </Col>
      <Col>
        <Button>Total : 65</Button>
      </Col>
    </Row>
  );
}

export default TopSider;
