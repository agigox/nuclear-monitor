import Indicator from '../images/location_on.png';
import PlannedDown from '../images/planned_down.png';
import Up from '../images/up.png';
import ForcedDown from '../images/forced_down.png';
import styled from "styled-components";
import _ from "lodash"

import React from 'react';


const Wrapper = styled.div`
  position: relative;
  top: ${props => props.top ? props.top : 0}px;
  left: ${props => props.left ? props.left : 0}px;
  right: ${props => props.right ? props.right : 0}px;
  bottom: ${props => props.bottom ? props.bottom : 0}px;
  display: flex;
  align-items: center;
`;
const Icon = styled.img`
  width: 13px;
`;
const IconIndicator = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;
const Infos = styled.div`
  display: flex;
  align-items: flex-end;
`;
const InfosReactor = styled.div`
  padding-left: 15px;
  padding-bottom: 2px;
  background: #FFFFFF;
  border: 1px solid #D5D5D5;
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
  margin-right: 13px;
`;
const CityName = styled.div`
  height: 13px;
  line-height: 17px;
  font-size: 11px;
`;
function ReactorIndicatorComponent(props) {
  const central = _.get(props, "unavailability.central");
  const planned = _.get(props, "unavailability.unavailibility.PLANNED_MAINTENANCE") ? _.get(props, "unavailability.unavailibility.PLANNED_MAINTENANCE").length : 0;
  const forced = _.get(props, "unavailability.unavailibility.FORCED_UNAVAILABILITY") ? _.get(props, "unavailability.unavailibility.FORCED_UNAVAILABILITY").length : 0;
  return(
   <Wrapper className={props.className}>
    <IconIndicator>
      <Icon src={Indicator} alt="indicator" />
    </IconIndicator>
    <InfosReactor>
      <CityName>{central}</CityName>
      <Infos>
        <InfosBloc>
          <InfosNumber>{planned + forced}</InfosNumber>
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
  )
}


export default ReactorIndicatorComponent;
