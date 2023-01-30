import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUnavailabilitiesOfCurrentCategoryCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectPerProductionTypeItemsOfCurrentCategory } from '../../../../../../../redux/selectors/productionsSelectors';
import { formatNumberToFr } from '../../../../../../../utils';

const StyledRow = styled(Row)`
  &.percents-text {
    flex-direction: column;
    .available-percent-text {
      flex-basis: 191px;
      width: 100%;
    }
    .down-percent-text {
      flex-basis: 50px;
      width: 100%;
      .down-percent-text-row {
        height: 100%;
        align-content: flex-end;
      }
    }
  }
`;
function TopSiderInfos() {
  const currentDownCapacity = useSelector(
    selectUnavailabilitiesOfCurrentCategoryCapacity,
  );
  // la puissance maximal de production currentCategory
  // eslint-disable-next-line no-unused-vars
  const currentCategoryLastProduction =
    useSelector(selectPerProductionTypeItemsOfCurrentCategory).lastProduction ||
    100;

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
          <Col span={24} className="text-2">
            {formatNumberToFr(currentCategoryLastProduction / 1000)} GW
          </Col>
        </Row>
      </Col>
      <Col className="down-percent-text" span={24}>
        <Row className="down-percent-text-row">
          <Col span={24} className="text-1">
            Indisponible
          </Col>
          <Col span={24} className="text-2">
            {formatNumberToFr(currentDownCapacity / 1000)} GW
          </Col>
        </Row>
      </Col>
      <Col className="production-percent-text" span={24}>
        <Row className="down-percent-text-row">
          <Col span={24} className="text-1">
            Indisponible
          </Col>
          <Col span={24} className="text-2">
            {formatNumberToFr(currentDownCapacity / 1000)} GW
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default TopSiderInfos;
