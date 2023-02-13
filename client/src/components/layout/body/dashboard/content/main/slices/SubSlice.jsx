/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import _ from 'lodash';
import { formatNumberToFr } from '../../../../../../../utils';

const StyledRow = styled(Row)`
  .slice-content-col {
    color: white;
  }
`;

function SubSlice({ name, pmax, production, available }) {
  const getClassName = () => {
    if (available === 0) {
      return 'fully-slice';
    }
    if (production <= 0) {
      return 'production-down-slice';
    }
    if (available - production <= 20) {
      // Pas d'indispo
      return 'up-slice';
    }
    return 'hashed-slice';
  };
  return (
    <StyledRow className="slice-content">
      <Col span={24} className="slice-content-pmax">
        Pmax: {formatNumberToFr(pmax)}
      </Col>
      <Col span={24} className={`slice-content-col ${getClassName()}`}>
        <Row>
          <Col span={24} className="slice-content-capacity">
            {Math.round(production)} <span>MW</span>
          </Col>
          <Col className="slice-content-city" span={24}>
            {name}
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default SubSlice;
