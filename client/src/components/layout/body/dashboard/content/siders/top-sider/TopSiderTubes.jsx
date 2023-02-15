import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { getPercentPixelStyle } from '../../../../../../../utils';
import { HEIGHT_TOP_SIDER_JAUGE } from '../../../../../../../utils/constants';

const StyledRow = styled(Row)`
  &.percents {
    flex-direction: column;
    .productions-percent {
      flex-basis: ${(props) => {
        return props.production;
      }}px;
      width: 100%;
      border-radius: 10px 10px 0px 0px;
      background: linear-gradient(180deg, #34c601 0%, #46eb57 100%);
    }
    .up-percent {
      flex-basis: ${(props) => {
        return props.rest >= 0 ? props.rest : 0;
      }}px;
      background: linear-gradient(180deg, #0078cf 0%, #009dd1 100%);
      width: 100%;
    }
    .down-percent {
      flex-basis: ${(props) => {
        return props.unavailable;
      }}px;
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
function TopSiderTubes({ unavailable, pmax, production }) {
  return (
    <StyledRow
      unavailable={getPercentPixelStyle(unavailable, pmax)}
      production={getPercentPixelStyle(production, pmax)}
      rest={
        HEIGHT_TOP_SIDER_JAUGE -
        getPercentPixelStyle(unavailable, pmax) -
        getPercentPixelStyle(production, pmax)
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
