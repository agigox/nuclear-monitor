/* eslint-disable no-prototype-builtins */
import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Image } from './Image';
import { WIDTH_JAUGE_SECTOR_MODAL } from '../../../utils/constants';
import { Name } from './Name';
import Percents from './Percents';
import { Jauges } from './Jauges';
import { selectPmaxCapacityByCategory } from '../../../redux/selectors/pmaxSelectors';
import { selectDataByProductionCategory } from '../../../redux/selectors/dataSelectors';

const StyledRow = styled(Row)`
  column-gap: 25px;
  .image-row {
    width: 186px;
    column-gap: 12px;
  }
`;
export function SectorItem({ sector }) {
  const data = useSelector(selectDataByProductionCategory).find((item) => {
    return item.key === sector;
  }).values;
  const categoryCapacity = useSelector((state) => {
    return selectPmaxCapacityByCategory(state, sector);
  });
  const categoryLastProduction = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.productionCapacity;
  }, 0);

  const unavailableCapacity = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.unavailableCapacity;
  }, 0);
  const getPercentPixelStyle = (value) => {
    return Math.round((value * WIDTH_JAUGE_SECTOR_MODAL) / categoryCapacity);
  };
  return (
    <StyledRow>
      <Col>
        <Row className="image-row" wrap={false}>
          <Col>
            <Image sector={sector} />
          </Col>
          <Col>
            <Name sector={sector} categoryCapacity={categoryCapacity} />
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>
            <Percents
              categoryLastProduction={categoryLastProduction}
              categoryCapacity={categoryCapacity}
              unavailableCapacity={unavailableCapacity}
            />
          </Col>
          <Col>
            <Jauges
              unavailablecapacity={getPercentPixelStyle(unavailableCapacity)}
              categorylastproduction={getPercentPixelStyle(
                categoryLastProduction,
              )}
              upcapacity={
                WIDTH_JAUGE_SECTOR_MODAL -
                getPercentPixelStyle(unavailableCapacity) -
                getPercentPixelStyle(categoryLastProduction)
              }
            />
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}
