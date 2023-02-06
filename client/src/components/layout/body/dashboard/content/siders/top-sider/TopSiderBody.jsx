import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import TopSiderTubes from './TopSiderTubes';
import TopSiderInfos from './TopSiderInfos';
import { HEIGHT_TOP_SIDER_JAUGE } from '../../../../../../../utils/constants';

const StyledRow = styled(Row)`
  height: ${HEIGHT_TOP_SIDER_JAUGE}px;
`;
function TopSiderBody() {
  return (
    <StyledRow className="top-sider-body" wrap={false}>
      <Col flex="74px">
        <TopSiderTubes />
      </Col>
      <Col flex="auto">
        <TopSiderInfos />
      </Col>
    </StyledRow>
  );
}

export default TopSiderBody;
