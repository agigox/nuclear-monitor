import { Col, Row } from 'antd';
import React from 'react';
import FilterChips from './chips';
import RefreshDate from './refresh';

function Filters() {
  return (
    <Row className="handle" wrap={false}>
      <Col flex="315px">
        <RefreshDate />
      </Col>
      <Col flex="auto">
        <FilterChips />
      </Col>
    </Row>
  );
}

export default Filters;
