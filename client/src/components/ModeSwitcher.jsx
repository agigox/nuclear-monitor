/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import styled from '@emotion/styled';
import appActions from '../redux/actions';

// eslint-disable-next-line react/prop-types

const StyledDiv = styled.div`
  text-align: right;
  background: unset;
  padding: 0 0 8px;
  @media only screen and (max-width: 767px) {
    padding: 0 0 20px;
    button {
      width: 50%;
    }
  }
`;

function ModeSwitcher() {
  const dispatch = useDispatch();
  const switchMode = (e) => {
    const mode = e.target.name === 'map';
    dispatch(appActions.crossActions.changeMode(mode));
  };
  return (
    <StyledDiv>
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
    </StyledDiv>
  );
}

export default ModeSwitcher;
