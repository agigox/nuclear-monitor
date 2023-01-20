/* eslint-disable no-prototype-builtins */
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductionTypes } from '../../../../../../../enums/productionTypes';

function TypeButtons() {
  const types = useSelector((state) => state.productionTypes.items);
  return (
    <Row>
      {types.map((type) => (
        <Col key={type.key}>
          <Button type="primary">
            {ProductionTypes.hasOwnProperty(type.key)
              ? ProductionTypes[type.key]
              : type.key}
          </Button>
        </Col>
      ))}
    </Row>
  );
}

export default TypeButtons;
