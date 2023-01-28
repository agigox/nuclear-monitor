import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import TopSiderTubes from './TopSiderTubes';
import TopSiderInfos from './TopSiderInfos';

const StyledRow = styled(Row)`
  height: 291px;
`;
function TopSiderBody() {
  return (
    <StyledRow className="top-sider-body" wrap={false}>
      <Col flex="70px">
        <TopSiderTubes />
      </Col>
      <Col flex="auto">
        <TopSiderInfos />
      </Col>
    </StyledRow>
  );
}

export default TopSiderBody;
