import React from 'react';
import { Row, Col, Card } from 'antd';
import styled from '@emotion/styled';
import Infos from '../../../../overview/Infos';
import Filters from './filters';
import Siders from './siders';
import Main from './main';

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
    <>
      <StyledRow className="dashboard">
        <Col span={24}>
          <Row>
            <Col>
              <Filters />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row wrap={false}>
            <Col flex="315px" className="handle">
              <Siders />
            </Col>
            <Col flex="auto" className="handle">
              <Card>
                <Main />
              </Card>
            </Col>
          </Row>
        </Col>
      </StyledRow>
      <Col className="overview-col">
        <Infos type="reactor" />
        <Infos type="power" />
      </Col>
    </>
  );
}

export default Content;
