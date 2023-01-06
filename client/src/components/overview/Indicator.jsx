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
  @media only screen and (max-width: 767px) {
    align-items: flex-end;
    justify-content: space-around;
    min-height: 35px;
    padding: 0 10px;
    margin-bottom: 10px;
    & > div.text {
      font-size: 14px;
      position: relative;
      top: 3px;
    }
    & > div.indicator {
      font-size: 30px;
      line-height: 24px;
    }
  }
`;
const StyledIndicatorPower = styled.div`
  height: ${(props) => props.indicator * 6}px;
  display: flex;
  flex-flow: row nowrap;
  padding: 5px;
  padding-left: 10px;
  align-items: center;
  min-height: 60px;
  & > div.icon {
    flex-basis: 32px;
    align-self: stretch;
    border-radius: 5px;
  }
  & > div.text {
    flex-basis: 250px;
    font-style: normal;
    font-weight: 300;
    &.textBold {
      font-weight: 400;
      font-size: 19px;
      &.numberBold {
        display: inline-block;
        margin-top: 19px;
        font-weight: 700;
        font-size: 25px;
      }
    }
    font-size: 16px;
    line-height: 19px;
    color: #3e25a3;
    margin-left: 15px;
  }
  & > div.indicator {
    flex-basis: 60px;
    font-weight: 700;
    font-size: 40px;
    line-height: 55px;
    color: #3e25a3;
    padding-left: 7px;
  }
  @media only screen and (max-width: 767px) {
    justify-content: space-around;
  }
`;

function Indicator({ icon, text, indicator, type }) {
  if (type === 'power') {
    return (
      <StyledIndicatorPower indicator={indicator}>
        <div
          className={
            text === 'Indisponible' ? 'icon iconIndispo' : 'icon iconDispo'
          }
        />
        <div className={text === 'Indisponible' ? 'text' : 'text textBold'}>
          {text}
          <br />
          <span className="numberBold">{indicator.replace('.', ',')} GW</span>
        </div>
      </StyledIndicatorPower>
    );
  }
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
