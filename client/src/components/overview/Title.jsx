import React from 'react';
import styled from '@emotion/styled';

const StyledTitle = styled.div`
  font-family: 'Inter';
  font-style: italic;
  font-weight: 400;
  font-size: 17px;
  line-height: 21px;
  margin-bottom: 15px;
  color: grey;
  @media only screen and (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 15px;
    line-height: 15px;
  }
`;
function Title({ title }) {
  return <StyledTitle>{title}</StyledTitle>;
}
export default Title;
