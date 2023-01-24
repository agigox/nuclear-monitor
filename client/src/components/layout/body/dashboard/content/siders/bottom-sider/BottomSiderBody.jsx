import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFullyDownTotal,
  selectCurrentPartiallyDownTotal,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentTotal } from '../../../../../../../redux/selectors/referentielSelectors';

const StyledRow = styled(Row)`
  flex-direction: row;
  .bottom-sider-bottom-row {
    height: 48px;
    width: 250px;
    column-gap: 16px;

    .up,
    .partiallyDown,
    .fullyDown {
      height: 18px;
      width: 18px;
    }
  }
`;
function BottomSiderBody() {
  const currentFullyDownTotal = useSelector(selectCurrentFullyDownTotal);
  const currentPartiallyDownTotal = useSelector(
    selectCurrentPartiallyDownTotal,
  );
  const currentTotal = useSelector(selectCurrentTotal);

  return (
    <StyledRow className="bottom-sider-body">
      <Col span={24}>
        <Row align="middle" wrap={false} className="bottom-sider-bottom-row">
          <Col className="up" />
          <Col className="text-1" style={{ flexBasis: '150px' }}>
            En fonctionnement
          </Col>
          <Col className="text-2">
            {currentTotal - currentPartiallyDownTotal - currentFullyDownTotal}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" wrap={false} className="bottom-sider-bottom-row">
          <Col className="partiallyDown" />
          <Col className="text-1" style={{ flexBasis: '150px' }}>
            En fonctionnement partiel
          </Col>
          <Col className="text-2">{currentPartiallyDownTotal}</Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row align="middle" wrap={false} className="bottom-sider-bottom-row">
          <Col className="fullyDown" />
          <Col className="text-1" style={{ flexBasis: '150px' }}>
            En arrêt complet
          </Col>
          <Col className="text-2">{currentFullyDownTotal}</Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default BottomSiderBody;
