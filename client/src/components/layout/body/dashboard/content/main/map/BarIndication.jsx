import styled from '@emotion/styled';
import { Row } from 'antd';
import React from 'react';

const StyledRow = styled(Row)`
  width: 159px;
  height: 63px;
  background: #ffffff;
  opacity: 0.8;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;
function BarIndication({ productionUnit }) {
  return <StyledRow>{productionUnit}</StyledRow>;
}

export default BarIndication;
