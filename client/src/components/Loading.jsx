import React from 'react';
import { Row, Spin } from 'antd';
import { useSelector } from 'react-redux';

function Loading() {
  const error = useSelector((state) => state.unavailabilities.error);
  console.log(error);
  if (error) {
    <Row justify="space-around" align="middle">
      {error}
    </Row>;
  }
  return (
    <Row justify="space-around" align="middle">
      <Spin size="large" />
    </Row>
  );
}

export default Loading;
