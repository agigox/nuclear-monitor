import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFullyDownPower,
  selectCurrentPartiallyDownPower,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentPower } from '../../../../../../../redux/selectors/referentielSelectors';

/*
291px --> currentPower
x --> unavailable
x = Math.round((unavailable * 291) / currentPower)
y = 291 - Math.round((unavailable * 291) / currentPower)
*/
const StyledRow = styled(Row)`
  height: 291px;
  .percents {
    flex-direction: column;
    .up-percent {
      flex-basis: ${(props) =>
        291 - Math.round((props.unavailable * 291) / props.currentPower)}px;
      background: linear-gradient(180deg, #34c601 0%, #46eb57 100%);
      border-radius: 10px 10px 0px 0px;
      width: 100%;
    }
    .down-percent {
      flex-basis: ${(props) =>
        Math.round((props.unavailable * 291) / props.currentPower)}px;
      width: 100%;
      background: #d0574f;
      border-radius: 0px 0px 10px 10px;
    }
  }
  .percents-text {
    flex-direction: column;
    .up-percent-text {
      flex-basis: ${(props) =>
        Math.round((props.unavailable * 291) / props.currentPower)}px;
      width: 100%;
    }
    .down-percent-text {
      flex-basis: ${(props) =>
        291 - Math.round((props.unavailable * 291) / props.currentPower)}px;
      border-radius: 0px 0px 10px 10px;
      width: 100%;
      .down-percent-text-row {
        height: 100%;
        align-content: flex-end;
      }
    }
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
      className="top-sider-body"
      currentPower={currentPower}
      unavailable={currentFullyDownPower + currentPartiallyDownPower}
      wrap={false}
    >
      <Col flex="70px">
        <Row
          align="middle"
          gutter={13}
          wrap={false}
          style={{ margin: 0 }}
          className="percents"
        >
          <Col className="up-percent" span={24} />
          <Col className="down-percent" span={24} />
        </Row>
      </Col>
      <Col flex="auto">
        <Row
          align="middle"
          gutter={13}
          wrap={false}
          style={{ margin: 0 }}
          className="percents-text"
        >
          <Col className="up-percent-text" span={24}>
            <Row>
              <Col span={24} className="text-1">
                Capacité disponible
              </Col>
              <Col span={24} className="text-2">
                {(
                  (currentPower -
                    currentFullyDownPower -
                    currentPartiallyDownPower) /
                  1000
                ).toFixed(1)}{' '}
                GW
              </Col>
            </Row>
          </Col>
          <Col className="down-percent-text" span={24}>
            <Row className="down-percent-text-row">
              <Col span={24} className="text-1">
                Indisponible
              </Col>
              <Col span={24} className="text-2">
                {(
                  (currentFullyDownPower + currentPartiallyDownPower) /
                  1000
                ).toFixed(1)}{' '}
                GW
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default TopSiderBody;
