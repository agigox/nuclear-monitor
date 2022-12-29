import React from 'react';
import styled from '@emotion/styled';

const StyledIndicator = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  min-height: 75px;
  & > div.icon {
    img {
      width: 32px;
    }
    padding-right: 10px;
    flex-basis: 53px;
  }
  & > div.text {
    self-align: flex-start;
    flex-basis: 250px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #3e25a3;
  }
  & > div.indicator {
    flex-basis: 60px;
    font-weight: 700;
    font-size: 40px;
    line-height: 55px;
    color: #3e25a3;
    padding-left: 7px;
  }
`;

function Indicator({ icon, text, indicator }) {
  return (
    <StyledIndicator>
      <div className="icon">
        <img src={icon} alt="" />
      </div>
      <div className="text">{text}</div>
      <div className="indicator">{indicator}</div>
    </StyledIndicator>
  );
}
export default Indicator;
