import styled from '@emotion/styled';
import { Button } from 'antd';
import React from 'react';

const StyledButton = styled(Button)`
  &.summary {
    background-color: #a3ddf0;
    padding: 4px 8px;
    height: 36px;
    color: #004d66;
  }
  &.chips {
    line-height: 16px;
    padding: 8px;
    background-color: transparent;
    border: 1px solid #ffffff;
    &.active {
      background: #e9f7fc;
      border: 1px solid #009dd1;
      color: #004d66;
    }
  }
  &.refresh {
    width: 54px;
    height: 48px;
    border: 2px solid #ffffff;
    border-radius: 8px;
    background-color: transparent;
  }
`;
function Buttons({ children, styling, active, clickHandler, icon, loading }) {
  return (
    <StyledButton
      className={`${styling} ${active ? 'active' : ''} `}
      type="primary"
      onClick={clickHandler}
      icon={icon}
      loading={loading}
    >
      {children}
    </StyledButton>
  );
}

export default Buttons;
