import { Col, Row } from 'antd';
import React from 'react';
import Buttons from '../../../../../../utils/Buttons';
import BottomSiderBody from './BottomSiderBody';

function BottomSider() {
  return (
    <Row>
      <Col>
        <BottomSiderBody />
      </Col>
      <Col>
        <Buttons styling="summary">Part de capacité disponible : 68 %</Buttons>
      </Col>
    </Row>
  );
}

export default BottomSider;
