import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import appActions from '../../../../../../../redux/actions';
import Buttons from '../../../../../../utils/Buttons';

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

function ModeButtons() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.cross.mode);
  const switchMode = (displayMode) => {
    dispatch(appActions.crossActions.changeDisplayMode(displayMode));
  };

  return (
    <StyledRow align="middle" justify="space-between">
      <Col>
        <Buttons
          styling="chips"
          clickHandler={() => switchMode('map')}
          active={mode === 'map'}
        >
          Carte
        </Buttons>
      </Col>
      <Col>
        <Buttons
          styling="chips"
          clickHandler={() => switchMode('slices')}
          active={mode === 'slices'}
        >
          Tranches
        </Buttons>
      </Col>
    </StyledRow>
  );
}

export default ModeButtons;
