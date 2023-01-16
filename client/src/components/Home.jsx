/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import styled from '@emotion/styled';
import Error from './Error';
import ModeSwitcher from './ModeSwitcher';
import Infos from './overview/Infos';
import Details from './Details';

const StyledRow = styled(Row)`
  column-gap: 27px;
  & > .overview-col {
    flex-basis: 353px;
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
        <ModeSwitcher />
        <Details />
      </Col>
    </StyledRow>
  );
  return <>{error ? <Error error={error} /> : success}</>;
}

export default Home;
