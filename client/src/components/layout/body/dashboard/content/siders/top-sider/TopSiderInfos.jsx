import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { toPercent, formatNumberToFr } from '../../../../../../../utils';

const StyledRow = styled(Row)`
  &.percents-text {
    flex-direction: column;
    .available-percent-text {
      flex-basis: 192px;
      width: 100%;
    }
    .down-percent-text,
    .production-percent-text {
      padding-top: 30px;
      flex-basis: 52px;
      width: 100%;
      .down-percent-text-row {
        height: 100%;
        align-content: flex-end;
        .separator-percent-text {
          width: 0px;
          height: 9.5px;
          border: 1px solid #000000;
        }
        .percents-row {
          column-gap: 7px;
          align-items: baseline;
        }
      }
    }
    .prod-text {
      align-items: baseline;
      column-gap: 6px;
    }
  }
`;
function TopSiderInfos({ unavailable, pmax, production }) {
  const rest = pmax - unavailable - production;
  return (
    <StyledRow
      align="middle"
      gutter={13}
      wrap={false}
      style={{ margin: 0 }}
      className="percents-text"
    >
      <Col className="available-percent-text" span={24}>
        <Row>
          <Col span={24} className="text-1">
            Production
          </Col>
          <Col span={24}>
            <Row className="prod-text">
              <Col className="text-2">
                {formatNumberToFr(production / 1000)}
              </Col>
              <Col className="text-unit">GW</Col>
              <Col span={24} className="text-unit-percent">
                {`${toPercent(production, pmax)}%`}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="down-percent-text" span={24}>
        <Row className="down-percent-text-row">
          <Col span={24} className="text-1">
            Disponible
          </Col>
          <Col span={24} className="text-2">
            <Row className="percents-row">
              <Col className="text-1-1">
                {rest < 0 ? 0 : formatNumberToFr(rest / 1000)}
              </Col>
              <Col className="text-1-2">GW</Col>
              <Col className="separator-percent-text" />
              <Col className="text-1-3">{`${
                rest < 0 ? 0 : toPercent(rest, pmax)
              }%`}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className="production-percent-text" span={24}>
        <Row className="down-percent-text-row">
          <Col span={24} className="text-1">
            Indisponible
          </Col>
          <Col span={24} className="text-2">
            <Row className="percents-row">
              <Col className="text-1-1">
                {formatNumberToFr(unavailable / 1000)}
              </Col>
              <Col className="text-1-2">GW</Col>
              <Col className="separator-percent-text" />
              <Col className="text-1-3">{`${toPercent(
                unavailable,
                pmax,
              )}%`}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default TopSiderInfos;
