import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';
import BarIndication from './BarIndication';
import MapBarContent from './MapBarContent';

const StyledRow = styled(Row)`
  column-gap: 4px;
`;
function MapBar({
  productionUnitName,
  productionUnitPmax,
  unavailabilityUnitProduction,
  productionUnitProduction,
}) {
  const getBarPercent = (value) => {
    return Math.round((value * HEIGHT_MAP_BAR) / productionUnitPmax);
  };
  const down = getBarPercent(unavailabilityUnitProduction);
  const prod = getBarPercent(productionUnitProduction);
  return (
    <StyledRow wrap={false} align="middle" className="box">
      <Col>
        <MapBarContent down={down} prod={prod} pmax={productionUnitPmax} />
      </Col>
      <Col>
        <BarIndication
          productionUnitName={productionUnitName}
          productionUnitPmax={productionUnitPmax}
          down={down}
          prod={prod}
        />
      </Col>
    </StyledRow>
  );
}

export default MapBar;
