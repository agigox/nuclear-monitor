/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Layout } from 'antd';
import styled from '@emotion/styled';
import appActions from '../redux/actions';
// import Map1 from './Map1';

// eslint-disable-next-line react/prop-types

const StyledHeader = styled(Layout.Header)`
  text-align: right;
  background: unset;
  padding: 8px 26px;
`;

function ModeSwitcher() {
  const dispatch = useDispatch();
  const switchMode = (e) => {
    const mode = e.target.name === 'map';
    dispatch(appActions.crossActions.changeMode(mode));
  };
  return (
    <StyledHeader theme="light">
      <Button
        name="map"
        onClick={switchMode}
        type={useSelector((state) => state.cross.mode) ? 'primary' : 'default'}
      >
        Carte
      </Button>
      <Button
        onClick={switchMode}
        type={useSelector((state) => state.cross.mode) ? 'default' : 'primary'}
      >
        Tranches
      </Button>
    </StyledHeader>
  );
}

export default ModeSwitcher;
