import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryPmaxCapacity } from '../../../../../../../redux/selectors/pmaxSelectors';
import { selectUnavailabilitiesOfCurrentCategoryCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectPerProductionTypeItemsOfCurrentCategory } from '../../../../../../../redux/selectors/productionsSelectors';

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
    .productions-percent {
      flex-basis: ${(props) => props.currentcategorylastproduction}px;
      width: 100%;
      border-radius: 10px 10px 0px 0px;
      background: linear-gradient(180deg, #34c601 0%, #46eb57 100%);
    }
    .up-percent {
      flex-basis: ${(props) => props.currentupcapacity}px;
      background: linear-gradient(180deg, #0078cf 0%, #009dd1 100%);
      width: 100%;
    }
    .down-percent {
      flex-basis: ${(props) => props.currentdowncapacity}px;
      width: 100%;
      background: #d0574f;
      border-radius: 0px 0px 10px 10px;
    }
    .separator-percent {
      flex-basis: 5px;
      width: 100%;
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
  const currentDownCapacity = useSelector(
    selectUnavailabilitiesOfCurrentCategoryCapacity,
  );
  // la puissance maximal de production currentCategory
  const currentPmax = useSelector(selectCurrentCategoryPmaxCapacity);
  const currentCategoryLastProduction = useSelector(
    selectPerProductionTypeItemsOfCurrentCategory,
  ).lastProduction;
  const getPercentPixelStyle = (value) =>
    Math.round((value * 296) / currentPmax);
  return (
    <StyledRow
      currentdowncapacity={getPercentPixelStyle(currentDownCapacity)}
      currentcategorylastproduction={getPercentPixelStyle(
        currentCategoryLastProduction,
      )}
      currentupcapacity={
        296 -
        getPercentPixelStyle(currentDownCapacity) -
        getPercentPixelStyle(currentCategoryLastProduction)
      }
      align="middle"
      gutter={13}
      wrap={false}
      style={{ margin: 0 }}
      className="percents"
    >
      <Col className="productions-percent" span={24} />
      <Col className="up-percent" span={24} />
      <Col className="separator-percent" span={24} />
      <Col className="down-percent" span={24} />
    </StyledRow>
  );
}

export default TopSiderTubes;
