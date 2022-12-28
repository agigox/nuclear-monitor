import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
// import Map1 from './Map1';

// eslint-disable-next-line react/prop-types

const CustomCol = styled(Col)`
  height: 80px;
  line-height: 22px;
  text-align: center;
  padding: 3px;
`;
function Slices() {
  const unavailabilities = useSelector(
    (state) => state.unavailabilities.unavailabilities,
  );
  return (
    <Row>
      {unavailabilities.map((reactor) => (
        <CustomCol span={3} key={reactor.eicCode}>
          {reactor.name}
        </CustomCol>
      ))}
    </Row>
  );
}

export default Slices;
