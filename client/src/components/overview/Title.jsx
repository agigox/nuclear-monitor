import React from 'react';
import styled from '@emotion/styled';

const StyledTitle = styled.div`
  font-family: 'Inter';
  font-style: italic;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  margin-bottom: 15px;
`;
function Title({ title }) {
  return <StyledTitle>{title}</StyledTitle>;
}
export default Title;
