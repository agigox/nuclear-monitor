import { Col, Row } from 'antd';
import React from 'react';
import ModeButtons from './ModeButtons';
import TypeButtons from './TypeButtons';

function FilterChips() {
  return (
    <Row>
      <Col>
        <TypeButtons />
      </Col>
      <Col>
        <ModeButtons />
      </Col>
    </Row>
  );
}
export default FilterChips;
