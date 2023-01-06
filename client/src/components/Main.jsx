import React from 'react';
import styled from '@emotion/styled';
import Details from './Details';

const StyledDiv = styled.div`
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 20px rgba(44, 22, 132, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
  width: 100%;
  @media only screen and (max-width: 767px) {
    box-shadow: none;
  }
`;
function Main() {
  return (
    <StyledDiv>
      <Details />
    </StyledDiv>
  );
}

export default Main;
