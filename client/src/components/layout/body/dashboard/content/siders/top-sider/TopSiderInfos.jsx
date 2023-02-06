import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryPmaxCapacity } from '../../../../../../../redux/selectors/pmaxSelectors';
import { selectUnavailabilitiesOfCurrentCategoryCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectPerProductionTypeItemsOfCurrentCategory } from '../../../../../../../redux/selectors/productionsSelectors';
import { formatNumberToFr } from '../../../../../../../utils';

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
// pmaxtotal : 580 + 580 + 595 = 1755 (1816)
// indispo : 580
// prod : 0
// dispo : 1175 = 1755 - 0 + 580
function TopSiderInfos() {
  const currentPmax = useSelector(selectCurrentCategoryPmaxCapacity);
  const currentDownCapacity = useSelector(
    selectUnavailabilitiesOfCurrentCategoryCapacity,
  );
  // la puissance maximal de production currentCategory
  const currentCategoryLastProduction = useSelector(
    selectPerProductionTypeItemsOfCurrentCategory,
  ).lastProduction;
  const toPercent = (number) => Math.round((number * 100) / currentPmax);
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
                {formatNumberToFr(currentCategoryLastProduction / 1000)}
              </Col>
              <Col className="text-unit">GW</Col>
              <Col span={24} className="text-unit-percent">
                {`${toPercent(currentCategoryLastProduction)}%`}
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
                {formatNumberToFr(
                  (currentPmax -
                    currentDownCapacity -
                    currentCategoryLastProduction) /
                    1000,
                )}
              </Col>
              <Col className="text-1-2">GW</Col>
              <Col className="separator-percent-text" />
              <Col className="text-1-3">{`${toPercent(
                currentPmax -
                  currentDownCapacity -
                  currentCategoryLastProduction,
              )}%`}</Col>
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
                {formatNumberToFr(currentDownCapacity / 1000)}
              </Col>
              <Col className="text-1-2">GW</Col>
              <Col className="separator-percent-text" />
              <Col className="text-1-3">{`${toPercent(
                currentDownCapacity,
              )}%`}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default TopSiderInfos;
