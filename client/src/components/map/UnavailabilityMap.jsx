/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import Indicator from '../../images/location_on.svg';
import FullyDown from '../../images/fully_down.svg';
import Up from '../../images/up.svg';
import PartiallyDown from '../../images/partially_down.svg';

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
  padding-right: 2px;
  & > img {
    background: white;
  }
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
function UnavailabilityMap(props) {
  const { className, plant, availabilities, fullyDown, partiallyDown } = props;
  return (
    <Wrapper className={className}>
      <IconIndicator>
        <Icon src={Indicator} alt="indicator" />
      </IconIndicator>
      <InfosReactor>
        <CityName>{plant}</CityName>
        <Infos>
          <InfosBloc>
            <InfosNumber>{availabilities.length}</InfosNumber>
            <Icon src={Up} alt="up" />
          </InfosBloc>
          <InfosBloc>
            <InfosNumber>{partiallyDown.length}</InfosNumber>
            <Icon src={PartiallyDown} alt="planned_down" />
          </InfosBloc>
          <InfosBloc>
            <InfosNumber>{fullyDown.length}</InfosNumber>
            <Icon src={FullyDown} alt="forced_down" />
          </InfosBloc>
        </Infos>
      </InfosReactor>
    </Wrapper>
  );
}

export default UnavailabilityMap;
