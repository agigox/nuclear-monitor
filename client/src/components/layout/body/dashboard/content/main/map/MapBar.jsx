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
  border: 1px solid;
  height: ${HEIGHT_MAP_BAR}px;
  width: ${(props) => props.pmax}px;
`;
function MapBar({ productionUnit }) {
  const productionUnitPmax = useSelector((state) =>
    selectPmaxByProductionUnit(state, productionUnit),
  );

  // eslint-disable-next-line no-unused-vars
  const unavailabilityUnitProduction = useSelector((state) =>
    selectUnavailabilityByProductionUnit(state, productionUnit),
  );
  const productionUnitProduction = useSelector((state) =>
    selectProductionByProductionUnit(state, productionUnit),
  );

  const getBarWidth = (pmaxValue) => {
    if (pmaxValue > 3000) {
      return 30;
    }
    if (pmaxValue > 1500) {
      return 26;
    }
    if (pmaxValue > 500) {
      return 22;
    }
    if (pmaxValue > 300) {
      return 18;
    }
    return 10;
  };
  return (
    <StyledRow pmax={getBarWidth(productionUnitPmax)}>
      <Col span={24}>
        <MapBarContent
          productionUnitPmax={productionUnitPmax}
          unavailabilityUnitProduction={unavailabilityUnitProduction}
          productionUnitProduction={productionUnitProduction}
        />
      </Col>
      <Col span={24}>
        <BarIndication productionUnit={productionUnit} />
      </Col>
    </StyledRow>
  );
}

export default MapBar;
