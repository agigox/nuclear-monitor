import React from 'react';
import { Row, Col, Card } from 'antd';
import styled from '@emotion/styled';
import Filters from './filters';
import Siders from './siders';
import Main from './main';

const StyledRow = styled(Row)`
  padding: 64px 95px;
  column-gap: 27px;
  .content-filters {
    height: 48px;
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
    <StyledRow gutter={[0, 32]}>
      <Col span={24} className="content-filters">
        <Row>
          <Col span={24}>
            <Filters />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row wrap={false} style={{ columnGap: '16px' }}>
          <Col flex="315px">
            <Siders />
          </Col>
          <Col flex="auto">
            <Card>
              <Main />
            </Card>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default Content;
