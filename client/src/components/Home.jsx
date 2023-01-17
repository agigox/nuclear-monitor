/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';
import Error from './Error';
import ModeSwitcher from './ModeSwitcher';
import Infos from './overview/Infos';
import Unavailabilities from './unavailabilities/Unavailabilities';

const StyledRow = styled(Row)`
  column-gap: 27px;
  flex-wrap: nowrap;
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
function Home() {
  const error = useSelector((state) => state.unavailabilities.error);
  const success = (
    <StyledRow>
      <Col className="overview-col">
        <Infos type="refresh" />
        <Infos type="reactor" />
        <Infos type="power" />
      </Col>
      <Col>
        <Row className="main-row">
          <Col span={24}>
            <ModeSwitcher />
          </Col>
          <Col span={24}>
            <Unavailabilities />
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
  return <>{error ? <Error error={error} /> : success}</>;
}

export default Home;
