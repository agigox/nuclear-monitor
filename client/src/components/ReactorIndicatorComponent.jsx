/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from 'styled-components';
import React from 'react';
import Indicator from '../images/location_on.png';
import PlannedDown from '../images/planned_down.png';
import Up from '../images/up.png';
import ForcedDown from '../images/forced_down.png';
/*
const Wrapper = styled.div`
  position: relative;
  top: ${props => (props.top ? props.top : 0)}px;
  left: ${props => (props.left ? props.left : 0)}px;
  right: ${props => (props.right ? props.right : 0)}px;
  bottom: ${props => (props.bottom ? props.bottom : 0)}px;
  display: flex;
  align-items: center;
`;
*/
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 156px;
  height: 38px;
`;
const Icon = styled.img`
  width: 13px;
`;
const IconIndicator = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;
const Infos = styled.div`
  display: flex;
  align-items: flex-end;
`;
const InfosReactor = styled.div`
  padding-left: 10px;
  padding-bottom: 2px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
`;
const InfosNumber = styled.span`
  position: relative;
  top: 2px;
  right: 2px;
  font-weight: bold;
`;
const InfosBloc = styled.div`
  margin-right: 10px;
`;
const CityName = styled.div`
  height: 13px;
  line-height: 17px;
  font-size: 11px;
`;
function ReactorIndicatorComponent(props) {
  const { className, plant, availabilities, forced, planned } = props;
  return (
    <Wrapper className={className}>
      <IconIndicator>
        <Icon src={Indicator} alt="indicator" />
      </IconIndicator>
      <InfosReactor>
        <CityName>{plant}</CityName>
        <Infos>
          <InfosBloc>
            <InfosNumber>{availabilities}</InfosNumber>
            <Icon src={Up} alt="up" />
          </InfosBloc>
          <InfosBloc>
            <InfosNumber>{planned}</InfosNumber>
            <Icon src={PlannedDown} alt="planned_down" />
          </InfosBloc>
          <InfosBloc>
            <InfosNumber>{forced}</InfosNumber>
            <Icon src={ForcedDown} alt="forced_down" />
          </InfosBloc>
        </Infos>
      </InfosReactor>
    </Wrapper>
  );
}

export default ReactorIndicatorComponent;
