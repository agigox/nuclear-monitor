import { Col, Row } from 'antd';
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFullyDownByPlant,
  selectPartiallyDownByPlant,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectReactorsByPlant } from '../../../../../../../redux/selectors/referentielSelectors';
import { orderByTwoFields } from '../../../../../../../utils';
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

  const mappedItems = [
    ...fullyDownByPlant,
    ...partiallyDownByPlant,
    ...reactorsPlant.values,
  ].map((item) => ({
    name: item.name,
    unavailableCapacitySum: item.unavailableCapacitySum,
    availableCapacitySum: item.availableCapacitySum,
    installedCapacity: item.installedCapacity,
  }));
  const orderedItems = orderByTwoFields(
    mappedItems,
    ['name', 'unavailableCapacitySum'],
    ['asc', 'desc'],
  );
  const uniqItems = _.uniqBy(orderedItems, 'name');

  return (
    <Row className="slice">
      <Col className="slice-title" span={24}>
        {name}
      </Col>
      <Col span={24}>
        <Row className="slice-content-row">
          {uniqItems.map((item) => (
            <SliceContent
              key={item.name}
              name={item.name}
              unavailableCapacitySum={item.unavailableCapacitySum}
              installedCapacity={item.installedCapacity}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default Slice;
