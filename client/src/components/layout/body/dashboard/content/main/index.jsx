import { Col, Row } from 'antd';
import React from 'react';
import Map from '../../../../../../images/map.svg';

function Main() {
  return (
    <Row className="main">
      <Col span={24} className="map-container">
        <img src={Map} alt="map" />
      </Col>
    </Row>
  );
}

export default Main;
