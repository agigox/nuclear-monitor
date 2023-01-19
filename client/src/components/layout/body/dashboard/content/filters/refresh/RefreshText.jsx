import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

function RefreshText() {
  const lastRefreshDate = useSelector(
    (state) => state.unavailabilities.lastRefreshDate,
  );
  return (
    <Row className="refresh-text">
      <Col className="text-1" span={24}>
        Dernière mise à jour
      </Col>
      <Col className="text-2" span={24}>
        {lastRefreshDate}
      </Col>
    </Row>
  );
}

export default RefreshText;
