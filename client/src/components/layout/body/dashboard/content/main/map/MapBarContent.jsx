import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';

const StyledRow = styled(Row)`
  .map-bar-rest {
    height: ${(props) => HEIGHT_MAP_BAR - props.down - props.prod}px;
    background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
  }
  .map-bar-prod {
    height: ${(props) => props.prod}px;
    background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
  }
  .map-bar-down {
    height: ${(props) => props.down}px;
    background: #d0574f;
  }
`;
function MapBarContent({
  productionUnitPmax,
  unavailabilityUnitProduction,
  productionUnitProduction,
}) {
  const getPercentPixelStyle = (value) =>
    Math.round((value * HEIGHT_MAP_BAR) / productionUnitPmax);
  return (
    <StyledRow
      down={getPercentPixelStyle(unavailabilityUnitProduction)}
      prod={getPercentPixelStyle(productionUnitProduction)}
    >
      <Col span={24} className="map-bar-rest" />
      <Col span={24} className="map-bar-prod" />
      <Col span={24} className="map-bar-down" />
    </StyledRow>
  );
}

export default MapBarContent;
