import { Col, Row } from 'antd';
import React from 'react';
import styled from '@emotion/styled';
import { WIDTH_JAUGE_SECTOR_MODAL } from '../../../utils/constants';

const StyledRow = styled(Row)`
  &.jauge-modal {
    border-radius: 24px 0 0 24px;
    width: ${(props) => {
      return props.size;
    }}px;
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
      width: ${({ unavailablecapacity, categorylastproduction, size }) => {
        const tmp = size - unavailablecapacity - categorylastproduction;
        if (tmp < 0) {
          return unavailablecapacity + tmp;
        }
        return unavailablecapacity;
      }}px;
    }
  }
`;

const getBarWidth = (pmaxValue) => {
  if (pmaxValue > 3000) {
    return WIDTH_JAUGE_SECTOR_MODAL;
  }
  if (pmaxValue > 1500) {
    return WIDTH_JAUGE_SECTOR_MODAL - 40;
  }
  if (pmaxValue > 500) {
    return WIDTH_JAUGE_SECTOR_MODAL - 80;
  }
  if (pmaxValue > 300) {
    return WIDTH_JAUGE_SECTOR_MODAL - 120;
  }
  return WIDTH_JAUGE_SECTOR_MODAL - 160;
};
export function Jauges({
  unavailablecapacity,
  categorylastproduction,
  categoryCapacity,
}) {
  const c = getBarWidth(categoryCapacity);
  const a = Math.round(
    (unavailablecapacity * WIDTH_JAUGE_SECTOR_MODAL) / categoryCapacity,
  );
  const b = Math.round(
    (categorylastproduction * WIDTH_JAUGE_SECTOR_MODAL) / categoryCapacity,
  );

  return (
    <StyledRow
      className="jauge-modal"
      unavailablecapacity={a}
      categorylastproduction={b}
      upcapacity={c - a - b}
      size={c}
    >
      <Col className="production" />
      <Col className="rest" />
      <Col className="unavailable" />
    </StyledRow>
  );
}
