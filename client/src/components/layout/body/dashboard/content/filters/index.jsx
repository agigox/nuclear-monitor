import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import FilterChips from './chips';
import RefreshDate from './RefreshDate';

const StyledRow = styled(Row)`
  color: white;
`;
function Filters() {
  return (
    <StyledRow className="handle">
      <Col>
        <RefreshDate />
      </Col>
      <Col>
        <FilterChips />
      </Col>
    </StyledRow>
  );
}

export default Filters;
