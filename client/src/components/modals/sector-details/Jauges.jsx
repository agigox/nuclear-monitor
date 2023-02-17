import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import { WIDTH_JAUGE_SECTOR_MODAL } from '../../../utils/constants';

const StyledRow = styled(Row)`
  &.jauge-modal {
    border-radius: 24px 0 0 24px;
    width: ${WIDTH_JAUGE_SECTOR_MODAL}px;
    height: 25px;
    .production {
      background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
      width: ${(props) => {
        return props.categorylastproduction;
      }}px;
    }
    .rest {
      background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
      width: ${(props) => {
        return props.upcapacity < 0 ? 0 : props.upcapacity;
      }}px;
    }
    .unavailable {
      background: #d0574f;
      width: ${({ unavailablecapacity, categorylastproduction }) => {
        const tmp =
          WIDTH_JAUGE_SECTOR_MODAL -
          unavailablecapacity -
          categorylastproduction;
        if (tmp < 0) {
          return unavailablecapacity + tmp;
        }
        return unavailablecapacity;
      }}px;
    }
  }
`;
export function Jauges({
  unavailablecapacity,
  categorylastproduction,
  upcapacity,
}) {
  return (
    <StyledRow
      className="jauge-modal"
      unavailablecapacity={unavailablecapacity}
      categorylastproduction={categorylastproduction}
      upcapacity={upcapacity}
    >
      <Col className="production" />
      <Col className="rest" />
      <Col className="unavailable" />
    </StyledRow>
  );
}
