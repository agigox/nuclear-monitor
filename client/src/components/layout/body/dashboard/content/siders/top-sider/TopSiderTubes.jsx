import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryPmax } from '../../../../../../../redux/selectors/pmaxSelectors';
import { selectCurrentDownCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentCategoryLastProduction } from '../../../../../../../redux/selectors/productionsSelectors';

/*
currentPmax = currentDownCapacity + currentCategoryLastProduction
291px --> currentPmax
x --> currentDownCapacity
x = Math.round((currentDownCapacity * 291) / currentPmax)
y = 291 - Math.round((currentDownCapacity * 291) / currentPmax)
*/
const StyledRow = styled(Row)`
  &.percents {
    flex-direction: column;
    .available-percent {
      flex-basis: ${(props) =>
        291 -
        Math.round((props.currentDownCapacity * 291) / props.currentPmax) -
        Math.round(
          (props.currentCategoryLastProduction * 291) / props.currentPmax,
        )}px;
      background: linear-gradient(180deg, #34c601 0%, #46eb57 100%);
      border-radius: 10px 10px 0px 0px;
      width: 100%;
    }
    .down-percent {
      flex-basis: ${(props) =>
        Math.round((props.currentDownCapacity * 291) / props.currentPmax)}px;
      width: 100%;
      background: #d0574f;
      border-radius: 0px 0px 10px 10px;
    }
    .productions-percent {
      flex-basis: ${(props) =>
        Math.round(
          (props.currentCategoryLastProduction * 291) / props.currentPmax,
        )}px;
      width: 100%;
      background: linear-gradient(180deg, #0078cf 0%, #009dd1 100%);
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
function TopSiderTubes() {
  const currentDownCapacity = useSelector(selectCurrentDownCapacity);
  // la puissance maximal de production currentCategory
  const currentPmax = useSelector(selectCurrentCategoryPmax);
  const currentCategoryLastProduction = useSelector(
    selectCurrentCategoryLastProduction,
  );

  return (
    <StyledRow
      currentPmax={currentPmax}
      currentDownCapacity={currentDownCapacity}
      currentCategoryLastProduction={currentCategoryLastProduction}
      align="middle"
      gutter={13}
      wrap={false}
      style={{ margin: 0 }}
      className="percents"
    >
      <Col className="available-percent" span={24} />
      <Col className="productions-percent" span={24} />
      <Col className="down-percent" span={24} />
    </StyledRow>
  );
}

export default TopSiderTubes;
