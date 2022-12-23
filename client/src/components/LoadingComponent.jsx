import React from 'react';
import { Spin, Row } from 'antd';

function LoadingComponent() {
  return (
    <Row className="spinner">
      <Spin size="large" />
    </Row>
  );
}

export default LoadingComponent;
