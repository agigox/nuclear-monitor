/* eslint-disable no-nested-ternary */
import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';

const StyledRow = styled(Row)`
  .slice-content-col {
    color: white;
  }
`;
function SliceContent({
  name,
  unavailableCapacitySum,
  availableCapacitySum,
  installedCapacity,
}) {
  console.log(availableCapacitySum);
  return (
    <StyledRow
      className="slice-content"
      unavailableCapacitySum={unavailableCapacitySum}
    >
      <Col span={24} className="slice-content-pmax">
        Pmax {installedCapacity}
      </Col>
      <Col
        span={24}
        className={`slice-content-col ${
          unavailableCapacitySum === 0
            ? 'up-slice'
            : unavailableCapacitySum === installedCapacity
            ? 'fully-slice'
            : 'partially-slice'
        }`}
      >
        <Row>
          <Col span={24} className="slice-content-capacity">
            <span>{installedCapacity - unavailableCapacitySum}</span> MW
          </Col>
          <Col className="slice-content-city" span={24}>
            {name}
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default SliceContent;
