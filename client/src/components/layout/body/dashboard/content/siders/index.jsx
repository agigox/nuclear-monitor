import { Card, Col, Row } from 'antd';
import React from 'react';
import BottomSider from './bottom-sider';
import TopSider from './top-sider';

function Siders() {
  return (
    <Row>
      <Col span={24} className="handle">
        <Card>
          <TopSider />
        </Card>
      </Col>
      <Col span={24} className="handle">
        <Card>
          <BottomSider />
        </Card>
      </Col>
    </Row>
  );
}

export default Siders;
