import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFullyDownByPlant,
  selectPartiallyDownByPlant,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';

function Slice({ name }) {
  const fullyDownByPlant = useSelector((state) =>
    selectFullyDownByPlant(state, name),
  );
  const partiallyDownByPlant = useSelector((state) =>
    selectPartiallyDownByPlant(state, name),
  );
  return (
    <Row className="handle">
      <Col>{name}</Col>
      <hr />
      <Col>
        {fullyDownByPlant.map((item) => (
          <div>{item.unit.name}</div>
        ))}
        {partiallyDownByPlant.map((item) => (
          <div>{item.unit.name}</div>
        ))}
      </Col>
    </Row>
  );
}

export default Slice;
