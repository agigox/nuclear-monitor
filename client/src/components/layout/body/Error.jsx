import React from 'react';
import styled from '@emotion/styled';
import { Row } from 'antd';

const StyledRow = styled(Row)`
  color: red;
  font-size: 32px;
  text-align: center;
  height: calc(100vh - 158px);
  background-color: #19252a;
`;
function Error({ error }) {
  return (
    <StyledRow justify="space-around" align="middle">
      {error}
    </StyledRow>
  );
}

export default Error;
