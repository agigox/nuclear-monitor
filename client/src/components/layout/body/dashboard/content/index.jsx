import React from 'react';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';
import Infos from '../../../../overview/Infos';
import Unavailabilities from '../../../../unavailabilities/Unavailabilities';
import Filters from './filters';

const StyledRow = styled(Row)`
  padding: 64px 95px;
  column-gap: 27px;
  & > .overview-col {
    flex-basis: 353px;
  }
  .main-row {
    flex-direction: column;
  }
  @media only screen and (max-width: 767px) {
    flex-wrap: wrap;
    flex-direction: column;
    row-gap: 10px;
    & > .overview-col {
      flex-basis: 100%;
    }
  }
`;
function Content() {
  return (
    <StyledRow className="dashboard">
      <Col span={24}>
        <Filters />
      </Col>
      <Col className="overview-col">
        <Infos type="reactor" />
        <Infos type="power" />
      </Col>
      <Col>
        <Row className="main-row">
          <Col span={24}>
            <Unavailabilities />
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default Content;
