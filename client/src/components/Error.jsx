import React from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  color: red;
  font-size: 32px;
  text-align: center;
`;
function Error({ error }) {
  return (
    <StyledDiv justify="space-around" align="middle">
      {error}
    </StyledDiv>
  );
}

export default Error;
