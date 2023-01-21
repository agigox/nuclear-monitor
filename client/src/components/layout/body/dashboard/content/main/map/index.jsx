import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import SVGMap from '../../../../../../../images/map.svg';
import Marker from './Marker';

function Map() {
  const unavailabilities = useSelector(
    (state) => state.unavailabilities.unavailabilities,
  );
  return (
    <Row>
      <Col className="map-container" span={24}>
        <img src={SVGMap} alt="map" />
        {unavailabilities.map((unavailability) => {
          const {
            plant,
            availabilities,
            unavailabilities: { fullyDown, partiallyDown },
          } = unavailability;
          return (
            <Marker
              key={plant}
              className={`${plant.toLowerCase().replace(/ |-/g, '')} mark-city`}
              plant={plant}
              availabilities={availabilities}
              fullyDown={fullyDown}
              partiallyDown={partiallyDown}
            />
          );
        })}
      </Col>
    </Row>
  );
}

export default Map;
