/* eslint-disable react/prop-types */
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

import React from 'react';
// import styled from 'styled-components';
import ReactorIndicatorComponent from './ReactorIndicatorComponent';
// import Map from '../images/map3.svg';
import SVGMap from './SVGMap';

/*
const PositionedDiv = styled.div`
  position: relative;
  top: ${props => (props.top ? props.top : 0)}px;
  left: ${props => (props.left ? props.left : 0)}px;
  right: ${props => (props.right ? props.right : 0)}px;
  bottom: ${props => (props.bottom ? props.bottom : 0)}px;
  display: flex;
  align-items: center;
`;
*/
// eslint-disable-next-line react/prop-types
function PlantMap1({ unavailabilities }) {
  return (
    <div className="map-holder">
      <SVGMap />
      {unavailabilities.map(unavailability => {
        const {
          plant,
          availabilities,
          unavailabilities: { forced, planned },
        } = unavailability;
        console.log(plant);
        return (
          <ReactorIndicatorComponent
            key={plant}
            className={`${plant.toLowerCase().replace(/ |-/g, '')} mark-city`}
            plant={plant}
            availabilities={availabilities}
            forced={forced}
            planned={planned}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    unavailabilities: state.unavailabilities,
  };
};

export default connect(mapStateToProps)(PlantMap1);
