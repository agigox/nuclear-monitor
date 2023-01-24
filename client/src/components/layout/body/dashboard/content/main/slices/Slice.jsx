import { Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFullyDownByPlant,
  selectPartiallyDownByPlant,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectReactorsByPlant } from '../../../../../../../redux/selectors/referentielSelectors';

function Slice({ name }) {
  const fullyDownByPlant = useSelector((state) =>
    selectFullyDownByPlant(state, name),
  );
  const partiallyDownByPlant = useSelector((state) =>
    selectPartiallyDownByPlant(state, name),
  );
  const reactorsPlant = useSelector((state) =>
    selectReactorsByPlant(state, name),
  );

  const result1 = _.chain([
    ...fullyDownByPlant,
    ...partiallyDownByPlant,
    ...reactorsPlant.values,
  ])
    .map((item) => ({
      name: item.name,
      unavailableCapacitySum:
        'netPowerMW' in item ? 0 : Number(item.unavailableCapacitySum),
    }))
    .sortBy('name')
    .uniq('name')
    .value();
  // .sortBy('name');

  return (
    <Row className="handle">
      <Col>{name}</Col>
      <hr />
      <Col>
        {result1.map((item) => (
          <div>
            {item.name} ({item.unavailableCapacitySum})
          </div>
        ))}
      </Col>
    </Row>
  );
}

export default Slice;
