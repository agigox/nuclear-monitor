/* eslint-disable no-prototype-builtins */
import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import FOSSIL_GAS from '../../../images/sector-modal/fossil_gas.svg';
import FOSSIL_OIL from '../../../images/sector-modal/fossil_oil.svg';
import HYDRAULICS from '../../../images/sector-modal/hydraulics.svg';
import NUCLEAR from '../../../images/sector-modal/nuclear.svg';
import SOLAR from '../../../images/sector-modal/solar.svg';
import WINDS from '../../../images/sector-modal/winds.svg';
import FOSSIL_HARD_COAL from '../../../images/sector-modal/fossil_hard_coal.svg';
import { ProductionCategories } from '../../../enums/ProductionCategories';
import { selectPmaxCapacityByCategory } from '../../../redux/selectors/pmaxSelectors';
import { selectPerProductionTypeItemsByCategory } from '../../../redux/selectors/productionsSelectors';
import { selectUnavailabilitiesByCategoryCapacity } from '../../../redux/selectors/productionCategoriesSelectors';
import { WIDTH_JAUGE_SECTOR_MODAL } from '../../../utils/constants';

const StyledRow = styled(Row)`
  .jauge-modal {
    width: ${WIDTH_JAUGE_SECTOR_MODAL}px;
    height: 25px;
    .production {
      background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
      width: ${(props) => props.categorylastproduction}px;
      border-radius: 24px 0 0 24px;
    }
    .rest {
      background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
      width: ${(props) => props.upcapacity}px;
    }
    .unavailable {
      background: #d0574f;
      width: ${(props) => props.downcapacity}px;
      border-radius: 0 24px 24px 0;
    }
  }
`;
// eslint-disable-next-line consistent-return
const getIconBySector = (icon) => {
  switch (icon) {
    case 'FOSSIL_GAS':
      return FOSSIL_GAS;
    case 'FOSSIL_HARD_COAL':
      return FOSSIL_HARD_COAL;
    case 'FOSSIL_OIL':
      return FOSSIL_OIL;
    case 'HYDRAULICS':
      return HYDRAULICS;
    case 'NUCLEAR':
      return NUCLEAR;
    case 'SOLAR':
      return SOLAR;
    case 'WINDS':
      return WINDS;
    default:
  }
};
export function SectorItem({ sector }) {
  const categoryCapacity = useSelector((state) =>
    selectPmaxCapacityByCategory(state, sector),
  );
  const categoryLastProduction =
    useSelector((state) =>
      selectPerProductionTypeItemsByCategory(state, sector),
    ).lastProduction || 0;

  const downCapacity = useSelector((state) =>
    selectUnavailabilitiesByCategoryCapacity(state, sector),
  );
  const toPercent = (number) => Math.round((number * 100) / categoryCapacity);
  const getPercentPixelStyle = (value) =>
    Math.round((value * WIDTH_JAUGE_SECTOR_MODAL) / categoryCapacity);
  return (
    <StyledRow
      downcapacity={getPercentPixelStyle(downCapacity)}
      categorylastproduction={getPercentPixelStyle(categoryLastProduction)}
      upcapacity={
        WIDTH_JAUGE_SECTOR_MODAL -
        getPercentPixelStyle(downCapacity) -
        getPercentPixelStyle(categoryLastProduction)
      }
    >
      <Col>
        <img src={getIconBySector(sector)} alt="icon" />
      </Col>
      <Col>
        <Row>
          <Col>
            {ProductionCategories.hasOwnProperty(sector)
              ? ProductionCategories[sector]
              : sector}
          </Col>
          <Col>{`Capacité ${categoryCapacity}MW`}</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>{`${toPercent(categoryLastProduction)}%`}</Col>
          <Col>.</Col>
          <Col>
            {`${toPercent(
              categoryCapacity - downCapacity - categoryLastProduction,
            )}%`}
          </Col>
        </Row>
      </Col>
      <Col>
        <Row className="jauge-modal">
          <Col className="production" />
          <Col className="rest" />
          <Col className="unavailable" />
        </Row>
      </Col>
    </StyledRow>
  );
}
