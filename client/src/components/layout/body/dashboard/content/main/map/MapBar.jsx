import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUnavailabilityByProductionUnit } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectProductionByProductionUnit } from '../../../../../../../redux/selectors/productionsSelectors';
import { selectPmaxByProductionUnit } from '../../../../../../../redux/selectors/referentielSelectors';
import { HEIGHT_MAP_BAR } from '../../../../../../../utils/constants';
import BarIndication from './BarIndication';
import MapBarContent from './MapBarContent';

const StyledRow = styled(Row)`
  column-gap: 4px;
`;
function MapBar({ productionUnit }) {
  const productionUnitPmax = useSelector((state) =>
    selectPmaxByProductionUnit(state, productionUnit),
  );

  const unavailabilityUnitProduction = useSelector((state) =>
    selectUnavailabilityByProductionUnit(state, productionUnit),
  );
  const productionUnitProduction = useSelector((state) =>
    selectProductionByProductionUnit(state, productionUnit),
  );

  const getBarPercent = (value) =>
    Math.round((value * HEIGHT_MAP_BAR) / productionUnitPmax);
  const down = getBarPercent(unavailabilityUnitProduction);
  const prod = getBarPercent(productionUnitProduction);
  return (
    <StyledRow wrap={false} align="middle" className="box">
      <Col>
        <MapBarContent down={down} prod={prod} pmax={productionUnitPmax} />
      </Col>
      <Col>
        <BarIndication
          productionUnitName={productionUnit}
          productionUnitPmax={productionUnitPmax}
          down={down}
          prod={prod}
        />
      </Col>
    </StyledRow>
  );
}

export default MapBar;
