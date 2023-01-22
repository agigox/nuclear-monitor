import { Col, Row } from 'antd';
import React from 'react';
import ModeButtons from './ModeButtons';
import CategoryButtons from './CategoryButtons';

function FilterChips() {
  return (
    <Row justify="space-between">
      <Col>
        <CategoryButtons />
      </Col>
      <Col>
        <ModeButtons />
      </Col>
    </Row>
  );
}
export default FilterChips;
