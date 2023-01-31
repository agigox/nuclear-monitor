/* eslint-disable no-unused-vars */
import React from 'react';
import { Col, Row } from 'antd';

import { useSelector } from 'react-redux';
import Infos from './Infos';
import {
  selectFullyDownByPlant,
  selectPartiallyDownByPlant,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';

function Position(props) {
  const { productionUnit, availabilities } = props;
  /*
  const fullyDownLength = useSelector((state) =>
    selectFullyDownByPlant(state, plant),
  ).length;
  const partiallyDownLength = useSelector((state) =>
    selectPartiallyDownByPlant(state, plant),
  ).length;
  */
  return (
    <Row className="position">
      <Col span={24}>{productionUnit.replace('Saint', 'St')}</Col>
      <Col span={24}>
        <Infos availabilities={3} fullyDown={2} partiallyDown={1} />
      </Col>
    </Row>
  );
}

export default Position;
