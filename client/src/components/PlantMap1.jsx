import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Map from '../images/map3.svg'; 
import { connect } from 'react-redux';


import React from 'react';
import ReactorIndicatorComponent from './ReactorIndicatorComponent';
import styled from "styled-components";

const PositionedDiv = styled.div`
  position: relative;
  top: ${props => props.top ? props.top : 0}px;
  left: ${props => props.left ? props.left : 0}px;
  right: ${props => props.right ? props.right : 0}px;
  bottom: ${props => props.bottom ? props.bottom : 0}px;
  display: flex;
  align-items: center;
`;

function PlantMap1({unavailabilities}) {
  
  return(
   <div className="map-holder">
    <div className="box-1">
    <img src={Map} alt="map" />
    {unavailabilities.map((unavailability) => {
      return <ReactorIndicatorComponent className={unavailability.central.toLowerCase().replace(" ", "")} key={unavailability.central} unavailability={unavailability}/>
    })}
    </div>
   </div>
  )
}

const mapStateToProps = (state) => {
  return {
      unavailabilities: state.reactors
  }
}

export default connect(mapStateToProps)(PlantMap1);