import { Col, Row } from 'antd';
import React from 'react';
import FilterChips from './chips';
import RefreshDate from './refresh';

function Filters() {
  return (
    <Row wrap={false} justify="space-around" align="middle">
      <Col flex="334px">
        <RefreshDate />
      </Col>
      <Col flex="auto">
        <FilterChips />
      </Col>
    </Row>
  );
}

export default Filters;
