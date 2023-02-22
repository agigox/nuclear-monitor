/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import TopSiderTubes from './TopSiderTubes';
import TopSiderInfos from './TopSiderInfos';
import { HEIGHT_TOP_SIDER_JAUGE } from '../../../../../../../utils/constants';
import {
  selectCurrentCapacity,
  selectCurrentPmax,
} from '../../../../../../../redux/selectors/dataSelectors';

const StyledRow = styled(Row)`
  height: ${HEIGHT_TOP_SIDER_JAUGE}px;
`;
function TopSiderBody() {
  const { production, unavailable } = useSelector(selectCurrentCapacity);
  const pmax = useSelector(selectCurrentPmax);
  return (
    <StyledRow className="top-sider-body" wrap={false}>
      <Col flex="74px">
        <TopSiderTubes
          unavailable={unavailable}
          pmax={pmax}
          production={production}
        />
      </Col>
      <Col flex="auto">
        <TopSiderInfos
          unavailable={unavailable}
          pmax={pmax}
          production={production}
        />
      </Col>
    </StyledRow>
  );
}

export default TopSiderBody;
