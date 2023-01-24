import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import SVGMap from '../../../../../../../images/map.svg';
import { selectCurrentReferentiel } from '../../../../../../../redux/selectors/referentielSelectors';
import Position from './Position';
import Location from '../../../../../../../images/location_on.svg';

function Map() {
  const currentReferentiel = useSelector(selectCurrentReferentiel);

  const { values } = currentReferentiel;

  return (
    <Row>
      <Col className="map-container" span={24}>
        <img src={SVGMap} alt="map" />
        {values.map((referentielIntem) => {
          const { values: valuesRefrentielItem, key } = referentielIntem;
          return (
            <Row
              key={key}
              className={`${key.toLowerCase().replace(/ |-/g, '')} mark-city`}
              style={{ columnGap: '5px' }}
            >
              <Col style={{ alignSelf: 'center' }}>
                <img src={Location} alt="indicator" />
              </Col>
              <Col>
                <Position
                  plant={key}
                  availabilities={valuesRefrentielItem.length}
                  partiallyDown={2}
                />
              </Col>
            </Row>
          );
        })}
      </Col>
    </Row>
  );
}

export default Map;
