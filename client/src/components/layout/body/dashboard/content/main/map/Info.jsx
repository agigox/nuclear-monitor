/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import { Col, Row } from 'antd';

const CustomRow = styled(Row)`
  column-gap: 4px;
`;

function Info({ number, className }) {
  return (
    <CustomRow align="bottom" justify="space-around">
      <Col>{number}</Col>
      <Col className={className} />
    </CustomRow>
  );
}

export default Info;