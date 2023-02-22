import React from 'react';
import { Row, Col } from 'antd';
import PageTitle from './PageTitle';
import Content from './content';
import GoTop from './GoTop';

function Dashboard() {
  return (
    <Row className="dashboard">
      <Col span={24}>
        <PageTitle />
      </Col>
      <Col span={24} className="overview-col">
        <Content />
      </Col>
      <Col span={24}>
        <GoTop />
      </Col>
    </Row>
  );
}

export default Dashboard;
