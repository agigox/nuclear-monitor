import { Col, Row } from 'antd';
import React from 'react';
import Buttons from '../../../../../../utils/Buttons';

function TopSiderButtons() {
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons styling="summary">Voir par filière</Buttons>
      </Col>
    </Row>
  );
}

export default TopSiderButtons;
