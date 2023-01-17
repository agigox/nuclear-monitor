import { Button, Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import appActions from '../../redux/actions';

function ReactorSlider({ name }) {
  const unavailabilities = useSelector(
    (state) => state.unavailabilities.unavailabilities,
  );
  const filterByName = unavailabilities.find(
    (u) =>
      u.plant.toUpperCase().split(' ')[0] ===
      name.split(' ').slice(0, 1).join(' '),
  );
  const dispatch = useDispatch();
  const changeCurrent = (el) => {
    dispatch(appActions.crossActions.changeCurrent(el));
  };
  const open = useSelector((state) => state.cross.current);
  return (
    <Row gutter={[5, 0]}>
      {filterByName &&
        _.sortBy(
          [
            ...filterByName.availabilities,
            ...filterByName.unavailabilities.fullyDown,
            ...filterByName.unavailabilities.partiallyDown,
          ],
          'name',
        ).map((el, index) => (
          <Col key={el.name}>
            <Button
              type={`${open.name === el.name ? 'primary' : 'default'}`}
              shape="round"
              onClick={() => changeCurrent(el)}
            >
              {index + 1}
            </Button>
          </Col>
        ))}
    </Row>
  );
}

export default ReactorSlider;
