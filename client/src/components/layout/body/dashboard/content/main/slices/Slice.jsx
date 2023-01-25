import { Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFullyDownByPlant,
  selectPartiallyDownByPlant,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectReactorsByPlant } from '../../../../../../../redux/selectors/referentielSelectors';
import SliceContent from './SliceContent';

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

  // eslint-disable-next-line no-unused-vars
  const result1 = _.chain([
    ...fullyDownByPlant,
    ...partiallyDownByPlant,
    ...reactorsPlant.values,
  ])
    .map((item) => ({
      name: item.name,
      unavailableCapacitySum: item.unavailableCapacitySum,
      availableCapacitySum: item.availableCapacitySum,
      installedCapacity: item.installedCapacity,
    }))
    .sortBy('name')
    .uniq('name')
    .value();
  const mapped = [
    ...fullyDownByPlant,
    ...partiallyDownByPlant,
    ...reactorsPlant.values,
  ].map((item) => ({
    name: item.name,
    unavailableCapacitySum: item.unavailableCapacitySum,
    availableCapacitySum: item.availableCapacitySum,
    installedCapacity: item.installedCapacity,
  }));
  const sorted = _.sortBy(mapped, 'name');
  const uniqed = _.uniqBy(sorted, 'name');
  // .sortBy('name');

  return (
    <Row className="slice">
      <Col className="slice-title" span={24}>
        {name}
      </Col>
      <Col span={24}>
        <Row className="slice-content-row">
          {uniqed.map((item) => (
            <SliceContent
              name={item.name}
              unavailableCapacitySum={item.unavailableCapacitySum}
              availableCapacitySum={item.availableCapacitySum}
              installedCapacity={item.installedCapacity}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default Slice;
