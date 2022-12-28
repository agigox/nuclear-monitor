/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Layout } from 'antd';
import styled from '@emotion/styled';
import appActions from '../redux/actions';
// import Map1 from './Map1';

// eslint-disable-next-line react/prop-types

const StyledHeader = styled(Layout.Header)`
  text-align: right;
  margin-right: 40px;
  width: 880px;
`;

function ModeSwitcher() {
  const dispatch = useDispatch();
  const switchMode = (e) => {
    const mode = e.target.name === 'map';
    dispatch(appActions.crossActions.changeMode(mode));
  };
  return (
    <StyledHeader>
      <Button name="map" onClick={switchMode}>
        Carte
      </Button>
      <Button onClick={switchMode}>Tranches</Button>
    </StyledHeader>
  );
}

export default ModeSwitcher;
