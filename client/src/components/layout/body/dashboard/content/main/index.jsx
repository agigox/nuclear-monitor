import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Map from './map';
import Slices from './slices';

function Main() {
  const mode = useSelector((state) => state.cross.mode);
  return (
    <Row className="main">
      <Col span={24}>{mode === 'map' && <Map />}</Col>
      <Col span={24}>{mode === 'slices' && <Slices />}</Col>
    </Row>
  );
}

export default Main;
