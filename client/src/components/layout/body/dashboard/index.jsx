import React from 'react';
import { Row, Col } from 'antd';
import PageTitle from './PageTitle';
import Content from './content';
import GoTop from './GoTop';
import PieChartItem from './content/main/map/PieChartItem';

const data = [
  { name: 'Group A', value: 400 }, // 33
  { name: 'Group B', value: 300 }, // 25
  { name: 'Group C', value: 300 }, // 25
  { name: 'Group D', value: 200 }, // 17
];
function Dashboard() {
  return (
    <Row className="dashboard">
      <Col span={24}>
        <PieChartItem data={data} />
      </Col>
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
