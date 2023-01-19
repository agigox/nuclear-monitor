import { Col, Row } from 'antd';
import React from 'react';
import FilterChips from './chips';
import RefreshDate from './refresh';

function Filters() {
  return (
    <Row className="handle" wrap={false}>
      <Col flex="1 1 315px">
        <RefreshDate />
      </Col>
      <Col>
        <FilterChips />
      </Col>
    </Row>
  );
}

export default Filters;
