import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  width: 100px;
  .percent-1 {
    color: #37cb0f;
    width: 39px;
  }
  .separatorPoint {
    margin-right: 7px;
  }
  .percent-2 {
    color: #0080d1;
  }
`;
function Percents({
  categoryLastProduction,
  categoryCapacity,
  unavailableCapacity,
}) {
  const toPercent = (number) => {
    return Math.round((number * 100) / categoryCapacity);
  };
  return (
    <StyledRow align="middle">
      <Col className="boldBody percent-1">{`${toPercent(
        categoryLastProduction,
      )}%`}</Col>
      <Col className="separatorPoint" />
      <Col className="boldBody percent-2">
        {`${toPercent(
          categoryCapacity - unavailableCapacity - categoryLastProduction,
        )}%`}
      </Col>
    </StyledRow>
  );
}

export default Percents;
