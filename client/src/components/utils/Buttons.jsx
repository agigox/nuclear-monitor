import styled from '@emotion/styled';
import { Button } from 'antd';
import React from 'react';

const StyledButton = styled(Button)`
  &.summary {
    background-color: #a3ddf0;
    padding: 4px 8px;
    height: 36px;
    border-radius: 4px;
    color: #004d66;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 28px;
  }
`;
function Buttons({ children, type }) {
  return (
    <StyledButton className={type} type="primary">
      {children}
    </StyledButton>
  );
}

export default Buttons;
