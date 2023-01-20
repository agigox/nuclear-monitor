import { Col, Row } from 'antd';
import React from 'react';

function TopSiderBody() {
  return (
    <Row>
      <Col>
        <Row>
          <Col className="up-mark" />
          <Col>En fonctionnement</Col>
          <Col>41</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="partially-mark" />
          <Col>En fonctionnement partiel</Col>
          <Col>41</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="fully-mark" />
          <Col>En arrêt complet</Col>
          <Col>41</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TopSiderBody;
