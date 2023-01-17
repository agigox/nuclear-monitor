/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'antd';
import styled from '@emotion/styled';
import appActions from '../redux/actions';

// eslint-disable-next-line react/prop-types

const StyledRow = styled(Row)`
  @media only screen and (max-width: 767px) {
    flex-directipon: column;
    row-gap: 10px;
    button {
      width: 50%;
    }
    .switcher-button-col {
      flex-basis: 50%;
    }
  }
`;

function ModeSwitcher() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.cross.mode);
  const switchMode = (e) => {
    const map = e.target.name === 'map';
    dispatch(appActions.crossActions.changeMode(map));
  };
  return (
    <StyledRow align="middle" justify="space-between">
      <Col className="title-main-col">
        {`${mode ? 'Représentation du parc nucléaire classé par site' : ''}`}
      </Col>

      <Col>
        <Row>
          <Col className="switcher-button-col">
            <Button
              name="map"
              onClick={switchMode}
              type={mode ? 'primary' : 'default'}
            >
              Carte
            </Button>
          </Col>
          <Col className="switcher-button-col">
            <Button onClick={switchMode} type={mode ? 'default' : 'primary'}>
              Tranches
            </Button>
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default ModeSwitcher;
