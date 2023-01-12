/* eslint-disable react/prop-types */
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import React from 'react';
// import styled from 'styled-components';
import styled from '@emotion/styled';
import UnavailabilityMap from './UnavailabilityMap';
import UnavailabilitySlices from './UnavailabilitySlices';
import SVGMap from '../../images/map.svg';

const Wrapper = styled.div`
  padding: 20px;
  margin: 20px auto;
  position: relative;
  width: 975px;
  &.map {
    height: 880px;
  }
  &.slices {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: flex-start;
  }
  & > img {
    width: 876px;
  }
  @media only screen and (max-width: 767px) {
    overflow-x: scroll;
  }
`;
// eslint-disable-next-line react/prop-types
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;
function Map() {
  const unavailabilities = useSelector(
    (state) => state.unavailabilities.unavailabilities,
  );
  const mode = useSelector((state) => state.cross.mode);
  return (
    <Wrapper className={mode ? 'map' : 'slices'}>
      {mode && <Img src={SVGMap} alt="" />}
      {unavailabilities.map((unavailability) => {
        const {
          plant,
          availabilities,
          unavailabilities: { fullyDown, partiallyDown },
        } = unavailability;
        return mode ? (
          <UnavailabilityMap
            key={plant}
            className={`${plant.toLowerCase().replace(/ |-/g, '')} mark-city`}
            plant={plant}
            availabilities={availabilities}
            fullyDown={fullyDown}
            partiallyDown={partiallyDown}
          />
        ) : (
          <UnavailabilitySlices
            key={plant}
            plant={plant}
            availabilities={availabilities}
            fullyDown={fullyDown}
            partiallyDown={partiallyDown}
          />
        );
      })}
    </Wrapper>
  );
}

export default Map;
