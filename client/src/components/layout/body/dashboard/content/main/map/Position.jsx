import React from 'react';
import { Col, Row } from 'antd';

import { useSelector } from 'react-redux';
import Infos from './Infos';
import {
  selectFullyDownByPlant,
  selectPartiallyDownByPlant,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';

function Position(props) {
  const { plant, availabilities } = props;
  const fullyDownLength = useSelector((state) =>
    selectFullyDownByPlant(state, plant),
  ).length;
  const partiallyDownLength = useSelector((state) =>
    selectPartiallyDownByPlant(state, plant),
  ).length;
  return (
    <Row className="position">
      <Col span={24}>{plant.replace('Saint', 'St')}</Col>
      <Col span={24}>
        <Infos
          availabilities={
            availabilities - fullyDownLength - partiallyDownLength
          }
          fullyDown={fullyDownLength}
          partiallyDown={partiallyDownLength}
        />
      </Col>
    </Row>
  );
}

export default Position;
