import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFullyDownPower,
  selectCurrentPartiallyDownPower,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentPower } from '../../../../../../../redux/selectors/referentielSelectors';

const StyledRow = styled(Row)`
  height: 291px;
  .up-percent {
    width: 70px;
    height: ${(props) =>
      291 - Math.round((props.unavailable * 291) / props.currentPower)}px;
    background: linear-gradient(180deg, #34c601 0%, #46eb57 100%);
    border-radius: 10px 10px 0px 0px;
  }
  .down-percent {
    width: 70px;
    height: ${(props) =>
      Math.round((props.unavailable * 291) / props.currentPower)}px;
    background: #d0574f;
    border-radius: 0px 0px 10px 10px;
  }
`;
function TopSiderBody() {
  const currentFullyDownPower = useSelector(selectCurrentFullyDownPower);
  const currentPartiallyDownPower = useSelector(
    selectCurrentPartiallyDownPower,
  );
  // la puissance du referentiel
  const currentPower = useSelector(selectCurrentPower);

  return (
    <StyledRow
      currentPower={currentPower}
      unavailable={currentFullyDownPower + currentPartiallyDownPower}
    >
      <Col>
        <Row align="middle" gutter={13} wrap={false} style={{ margin: 0 }}>
          <Col className="up-percent" flex="1 1 70px" />
          <Col flex="1 1 auto">
            <Row>
              <Col className="text-1" span={24}>
                Capacité disponible
              </Col>
              <Col className="text-2" span={24}>
                {currentPower}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row align="middle" gutter={13} wrap={false} style={{ margin: 0 }}>
          <Col className="down-percent" flex="1 1 70px" />
          <Col flex="1 1 auto">
            <Row>
              <Col className="text-1" span={24}>
                Indisponible
              </Col>{' '}
              <Col className="text-2" span={24}>
                {currentFullyDownPower + currentPartiallyDownPower}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default TopSiderBody;
