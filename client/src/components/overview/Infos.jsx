import React from 'react';
import styled from '@emotion/styled';
import { Col } from 'antd';

const StyledCol = styled(Col)`
  background: #ffffff;
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 20px rgba(44, 22, 132, 0.2);
  border-radius: 10px;
  padding: 26px;
`;
const Title = styled.div`
  font-family: 'Inter';
  font-style: italic;
  font-weight: 100;
  font-size: 12px;
  line-height: 15px;
`;
export default function Infos({ title }) {
  return (
    <StyledCol span={24}>
      <Title>{title}</Title>
    </StyledCol>
  );
}
