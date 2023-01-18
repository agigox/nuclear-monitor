import React from 'react';
import { Row, Spin } from 'antd';

function Loading() {
  return (
    <Row justify="space-around" align="middle">
      <Spin size="large" />
    </Row>
  );
}

export default Loading;
