/* eslint-disable react/prop-types */
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

import React from 'react';
// import styled from 'styled-components';
import styled from '@emotion/styled';
import Unavailability from './Unavailability';
// import SVGMap from '../../images/france.svg';
import SVGMap from '../../images/map.svg';

const Wrapper = styled.div`
  padding: 20px;
  margin: 20px auto;
  position: relative;
  width: 882px;
  height: 880px;
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
  return (
    <Wrapper>
      <Img src={SVGMap} alt="" />
      {unavailabilities.map((unavailability) => {
        const {
          plant,
          availabilities,
          unavailabilities: { fullyDown, partiallyDown },
        } = unavailability;
        return (
          <Unavailability
            key={plant}
            className={`${plant.toLowerCase().replace(/ |-/g, '')} mark-city`}
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
