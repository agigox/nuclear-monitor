import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryPmax } from '../../../../../../../redux/selectors/pmaxSelectors';
import { selectCurrentDownCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentCategoryLastProduction } from '../../../../../../../redux/selectors/productionsSelectors';
import { formatNumberToFr } from '../../../../../../../utils';

/*
currentPmax = currentDownCapacity + currentCategoryLastProduction
291px --> currentPmax
x --> currentDownCapacity
x = Math.round((currentDownCapacity * 291) / currentPmax)
y = 291 - Math.round((currentDownCapacity * 291) / currentPmax)
*/
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
/*
currentDownCapacity = currentFullyDownCapacity + currentPartiallyDownCapacity
currentPmax --> 100%
currentDownCapacity --> x
x = 100 - Math.round(((currentFullyDownCapacity + currentPartiallyDownCapacity) * 100) / currentPmax)
x --> currentDownCapacity
x = Math.round((currentDownCapacity * 291) / currentPmax)
y = 291 - Math.round((currentDownCapacity * 291) / currentPmax)
*/
function TopSiderTexts() {
  const currentDownCapacity = useSelector(selectCurrentDownCapacity);
  // la puissance maximal de production currentCategory
  const currentPmax = useSelector(selectCurrentCategoryPmax);
  const currentCategoryLastProduction = useSelector(
    selectCurrentCategoryLastProduction,
  );

  return (
    <StyledRow
      align="middle"
      gutter={13}
      wrap={false}
      style={{ margin: 0 }}
      className="percents-text"
      currentPmax={currentPmax}
      currentDownCapacity={currentDownCapacity}
      currentCategoryLastProduction={currentCategoryLastProduction}
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

export default TopSiderTexts;
