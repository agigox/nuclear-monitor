import { Card, Col, Row } from 'antd';
import React from 'react';
// import BottomSider from './bottom-sider';
import TopSider from './top-sider';

function Siders() {
  return (
    <Row style={{ rowGap: '16px' }}>
      <Col span={24}>
        <Card bordered={false}>
          <TopSider />
        </Card>
      </Col>
      {/* <Col span={24}>
        <Card title="Moyens de production" bordered={false}>
          <BottomSider />
        </Card>
      </Col> */}
    </Row>
  );
}

export default Siders;
