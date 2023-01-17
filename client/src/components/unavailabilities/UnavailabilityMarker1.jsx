/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import { Col, Row } from 'antd';

const Icon = styled.img`
  height: 15px;
`;
const CustomRow = styled(Row)`
  width: 28px;
  height: 20px;
  .marker-number {
    font-size: 16;
    line-height: 19px;
  }
`;

function UnavailabilityMarker1({ number, icon }) {
  return (
    <CustomRow align="bottom" justify="space-around">
      <Col className="marker-number">{number}</Col>
      <Col>
        <Icon src={icon} alt="" />
      </Col>
    </CustomRow>
  );
}

export default UnavailabilityMarker1;
