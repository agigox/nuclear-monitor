import React from 'react';
import styled from '@emotion/styled';

const StyledTotal = styled.div`
  height: 70px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  font-style: italic;
  flex-direction: row-reverse;
  .sum {
    font-size: 45px;
    font-weight: 100;
    line-height: 48px;
  }
  .total {
    line-height: 28px;
    font-size: 16px;
    padding-right: 15px;
  }
  @media only screen and (max-width: 767px) {
    height: 60px;
    justify-content: center;
    .sum {
      font-size: 30px;
      line-height: 34px;
    }
  }
`;

function Total({ total, text }) {
  return (
    <StyledTotal>
      <div className="sum">{total}</div> <div className="total">{text}</div>
    </StyledTotal>
  );
}
export default Total;
