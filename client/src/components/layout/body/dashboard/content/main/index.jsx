import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { DisplayModes } from '../../../../../../enums/DisplayModes';
import { selectDisplayMode } from '../../../../../../redux/selectors/crossSelectors';
import Map from './map';
import SlicesBody from './slices';

function Main() {
  const displayMode = useSelector(selectDisplayMode);
  return (
    <Row className="main">
      <Col span={24}>{displayMode === DisplayModes.MAP && <Map />}</Col>
      <Col span={24}>
        {displayMode === DisplayModes.SLICES && <SlicesBody />}
      </Col>
    </Row>
  );
}

export default Main;
