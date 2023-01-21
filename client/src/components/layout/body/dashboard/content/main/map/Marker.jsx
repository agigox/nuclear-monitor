/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import { Col, Row } from 'antd';
import Location from '../../../../../../../images/location_on.svg';
import FullyDown from '../../../../../../../images/fully_down.svg';
import Up from '../../../../../../../images/up.svg';
import PartiallyDown from '../../../../../../../images/partially_down.svg';
import NumberMarker from './NumberMarker';

const StyledRow = styled(Row)`
  flex-direction: column;
  align-items: center;
  width: 193px;
  height: 47px;
  .marker-col {
    padding-left: 5px;
    padding-right: 2px;
    & > img {
      background: white;
      width: 28px;
      height: 35px;
      position: relative;
      top: 5px;
    }
  }
  .plan-name {
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
  }
  .reactor-data {
    flex-direction: column;
    width: 155px;
    height: 45px;
  }
  .reactor-numbers {
    width: 121px;
  }
`;
function Marker(props) {
  const { className, plant, availabilities, fullyDown, partiallyDown } = props;
  return (
    <StyledRow className={`${className}`}>
      <Col className="marker-col" flex="1 1 42px">
        <img src={Location} alt="indicator" />
      </Col>
      <Col>
        <Row className="reactor-data">
          <Col className="plan-name">{plant.replace('Saint', 'St')}</Col>
          <Col>
            <Row
              className="reactor-numbers"
              justify="space-between"
              gap={[0, 7]}
            >
              <Col>
                <NumberMarker number={availabilities.length} icon={Up} />
              </Col>
              <Col>
                <NumberMarker
                  number={partiallyDown.length}
                  icon={PartiallyDown}
                />
              </Col>
              <Col>
                <NumberMarker number={fullyDown.length} icon={FullyDown} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default Marker;
