import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectFullyDownUnavailabilityOfCurrentCategoryNumber,
  selectPartiallyDownUnavailabilityOfCurrentCategoryNumber,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentCategoryGenerationUnitsNumber } from '../../../../../../../redux/selectors/referentielSelectors';

const StyledRow = styled(Row)`
  flex-direction: row;
  .bottom-sider-bottom-row {
    height: 48px;
    width: 233px;
    column-gap: 16px;
    align-items: center;
  }
`;
function BottomSiderBody() {
  const currentFullyDownNumber = useSelector(
    selectFullyDownUnavailabilityOfCurrentCategoryNumber,
  );
  const currentPartiallyDownNumber = useSelector(
    selectPartiallyDownUnavailabilityOfCurrentCategoryNumber,
  );
  const currentTotal = useSelector(selectCurrentCategoryGenerationUnitsNumber);

  return (
    <StyledRow className="bottom-sider-body">
      <Col span={24}>
        <Row
          justify="space-between"
          wrap={false}
          className="bottom-sider-bottom-row"
        >
          <Col className="text-1">En fonctionnement</Col>
          <Col className="text-2">
            {currentTotal - currentPartiallyDownNumber - currentFullyDownNumber}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row
          justify="space-between"
          wrap={false}
          className="bottom-sider-bottom-row"
        >
          <Col className="text-1">En fonctionnement partiel</Col>
          <Col className="text-2">{currentPartiallyDownNumber}</Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row
          justify="space-between"
          wrap={false}
          className="bottom-sider-bottom-row"
        >
          <Col className="text-1">En arrêt complet</Col>
          <Col className="text-2">{currentFullyDownNumber}</Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default BottomSiderBody;
