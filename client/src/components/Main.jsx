import React from 'react';
import { Layout } from 'antd';
import styled from '@emotion/styled';
import ModeSwitcher from './ModeSwitcher';
import Details from './Details';

const StyledLayout = styled(Layout)`
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 20px rgba(44, 22, 132, 0.2);
  border-radius: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
`;
function Main() {
  return (
    <StyledLayout>
      <ModeSwitcher />
      <Details />
    </StyledLayout>
  );
}

export default Main;
