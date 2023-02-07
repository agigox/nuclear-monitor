import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import Close from '../../images/close.svg';

const StyledRow = styled(Row)`
  border: 1px solid;
`;
function General({ title, children }) {
  return (
    <StyledRow className="modals-general">
      <Col span={24}>
        <Row justify="space-between" align="center">
          <Col className="title">{title}</Col>
          <Col>
            <img src={Close} alt="close" />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default General;
