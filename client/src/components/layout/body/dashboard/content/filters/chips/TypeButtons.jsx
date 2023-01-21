/* eslint-disable no-prototype-builtins */
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductionTypes } from '../../../../../../../enums/productionTypes';
import Buttons from '../../../../../../utils/Buttons';

function TypeButtons() {
  const types = useSelector((state) => state.productionTypes.items);
  return (
    <Row>
      {types.map((type) => (
        <Col key={type.key}>
          <Buttons styling="chips" type="primary">
            {ProductionTypes.hasOwnProperty(type.key)
              ? ProductionTypes[type.key]
              : type.key}
          </Buttons>
        </Col>
      ))}
    </Row>
  );
}

export default TypeButtons;
