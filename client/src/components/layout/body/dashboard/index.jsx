import React from 'react';
import { Row, Col } from 'antd';
import PageTitle from './PageTitle';
import Content from './content';

function Dashboard() {
  return (
    <Row className="dashboard">
      <Col span={24}>
        <PageTitle />
      </Col>
      <Col span={24} className="overview-col">
        <Content />
      </Col>
    </Row>
  );
}

export default Dashboard;
