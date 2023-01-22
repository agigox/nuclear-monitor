/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import { Col, Row } from 'antd';

import Info from './Info';

const StyledRow = styled(Row)`
  background: white;
`;
function Infos({ availabilities, fullyDown, partiallyDown }) {
  return (
    <StyledRow>
      <Col span={24}>
        <Row justify="space-between" gap={[0, 7]}>
          <Col>
            <Info number={availabilities} className="up" />
          </Col>
          <Col>
            <Info number={partiallyDown} className="partiallyDown" />
          </Col>
          <Col>
            <Info number={fullyDown} className="fullyDown" />
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default Infos;
