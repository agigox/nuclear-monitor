import { Col, Row } from 'antd';
import React from 'react';

function PageTitle() {
  return (
    <Row className="page-title">
      <Col className="text" span={24}>
        Application RTE qui présente la puissance produite et la disponibilité
        des moyens de production
      </Col>
    </Row>
  );
}

export default PageTitle;
