/* eslint-disable react/prop-types */
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import React from 'react';
// import styled from 'styled-components';
import styled from '@emotion/styled';
import { Row } from 'antd';
import UnavailabilityMarker from './UnavailabilityMarker';
import UnavailabilitySlice from './UnavailabilitySlice';
import SVGMap from '../../images/map.svg';

const StyledRow = styled(Row)`
  overflow-x: 'scroll';
`;
const Wrapper = styled.div`
  margin: 20px auto;
  position: relative;
  width: 975px;
  &.map {
    padding: 20px;
    height: 880px;
  }
  &.slices {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: flex-start;
  }
  & > img {
    width: 876px;
    position: absolute;
    top: 0;
    left: 60px;
  }
  @media only screen and (max-width: 767px) {
    overflow-x: scroll;
  }
`;
function Unavailabilities() {
  const unavailabilities = useSelector(
    (state) => state.unavailabilities.unavailabilities,
  );
  const mode = useSelector((state) => state.cross.mode);
  return (
    <StyledRow>
      <Wrapper className={mode ? 'map' : 'slices'}>
        {mode && <img src={SVGMap} alt="" />}
        {unavailabilities.map((unavailability) => {
          const {
            plant,
            availabilities,
            unavailabilities: { fullyDown, partiallyDown },
          } = unavailability;
          return mode ? (
            <UnavailabilityMarker
              key={plant}
              className={`${plant.toLowerCase().replace(/ |-/g, '')} mark-city`}
              plant={plant}
              availabilities={availabilities}
              fullyDown={fullyDown}
              partiallyDown={partiallyDown}
            />
          ) : (
            <UnavailabilitySlice
              key={plant}
              plant={plant}
              availabilities={availabilities}
              fullyDown={fullyDown}
              partiallyDown={partiallyDown}
            />
          );
        })}
      </Wrapper>
    </StyledRow>
  );
}

export default Unavailabilities;
