import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledRow = styled(Row)`
  ${({ theme }) => {
    return `
  width: 100px;
  .percent-1 {
    color: ${theme.colors.greenColor};
    width: 39px;
  }
  .separatorPoint {
    margin-right: 7px;
  }
  .percent-2 {
    color: ${theme.colors.blueColor}
  }
    
  `;
  }}
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
