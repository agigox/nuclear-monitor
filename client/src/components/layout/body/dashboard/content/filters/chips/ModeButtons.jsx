import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import styled from '@emotion/styled';
import Buttons from '../../../../../../utils/Buttons';
import { changeDisplayMode } from '../../../../../../../redux/reducers/crossReducer';
import { DisplayModes } from '../../../../../../../enums/DisplayModes';
import { selectDisplayMode } from '../../../../../../../redux/selectors/crossSelectors';

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
  const displayMode = useSelector(selectDisplayMode);
  const handleClick = (mode) => {
    dispatch(changeDisplayMode(mode));
  };

  return (
    <StyledRow align="middle" justify="space-between">
      <Col>
        <Buttons
          styling="chips tranches"
          clickHandler={() => handleClick(DisplayModes.SLICES)}
          active={displayMode === DisplayModes.SLICES}
        >
          Unités de production
        </Buttons>
      </Col>
      <Col>
        <Buttons
          styling="chips carte"
          clickHandler={() => handleClick(DisplayModes.MAP)}
          active={displayMode === DisplayModes.MAP}
        >
          Carte
        </Buttons>
      </Col>
    </StyledRow>
  );
}

export default ModeButtons;
