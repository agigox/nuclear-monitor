/* eslint-disable no-prototype-builtins */
import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Image } from './Image';
import { Name } from './Name';
import Percents from './Percents';
import { Jauges } from './Jauges';
import {
  selectDataByProductionCategory,
  selectPmaxByCategory,
} from '../../../redux/selectors/dataSelectors';

const StyledRow = styled(Row)`
  column-gap: 25px;
  .image-row {
    width: 170px;
    column-gap: 5px;
  }
  .capacity {
    color: #767676;
  }
`;
export function SectorItem({ sector }) {
  const data = useSelector(selectDataByProductionCategory).find((item) => {
    return item.key === sector;
  }).values;
  const categoryCapacity = useSelector((state) => {
    return selectPmaxByCategory(state, sector);
  });
  const categoryLastProduction = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.productionCapacity;
  }, 0);

  const unavailableCapacity = data.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.unavailableCapacity;
  }, 0);
  return (
    <StyledRow style={{ marginBottom: '15px' }} wrap={false}>
      <Col flex="170px">
        <Row className="image-row" wrap={false}>
          <Col>
            <Image sector={sector} />
          </Col>
          <Col>
            <Name sector={sector} categoryCapacity={categoryCapacity} />
          </Col>
        </Row>
      </Col>
      <Col flex="68px">
        <Row>
          <Col className="boldBody" span={24}>
            {`${(categoryLastProduction / 1000).toFixed(1)}GW`}
          </Col>
          <Col className="supportText capacity" span={24}>
            Production
          </Col>
        </Row>
      </Col>
      <Col>
        <Row wrap={false}>
          <Col>
            <Percents
              categoryLastProduction={categoryLastProduction}
              categoryCapacity={categoryCapacity}
              unavailableCapacity={unavailableCapacity}
            />
          </Col>
          <Col>
            <Jauges
              unavailablecapacity={unavailableCapacity}
              categorylastproduction={categoryLastProduction}
              categoryCapacity={categoryCapacity}
            />
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}
