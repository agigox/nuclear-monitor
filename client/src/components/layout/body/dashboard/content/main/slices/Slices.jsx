/* eslint-disable no-nested-ternary */
import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import Slice from './Slice';
import {
  selectDataByProductionCategoryAndProductionUnit,
  selectDataByProductionCategoryAndRegroupementHydro,
} from '../../../../../../../redux/selectors/dataSelectors';
import { ProductionCategoriesKeys } from '../../../../../../../enums/ProductionCategories';

function Slices({ category }) {
  const dataByCategory = useSelector((state) => {
    return selectDataByProductionCategoryAndProductionUnit(state, category);
  });
  const dataByRegroupementHydro = useSelector((state) => {
    return selectDataByProductionCategoryAndRegroupementHydro(state, category);
  });
  const isHydroCurrent = category === ProductionCategoriesKeys.HYDRAULICS;
  return (
    <Row className="slices-content">
      {(isHydroCurrent ? dataByRegroupementHydro : dataByCategory).values.map(
        (data) => {
          const toDevid = Math.floor(data.values.length / 6) + 1;
          return (
            <Col
              span={24}
              flex={`${
                toDevid === 1
                  ? toDevid * 92
                  : toDevid === 2
                  ? toDevid * 98
                  : toDevid * 100
              }px`}
              className="slices-content-col"
              key={data.key}
            >
              <Slice data={data} isHydroCurrent={isHydroCurrent} />
            </Col>
          );
        },
      )}
    </Row>
  );
}

export default Slices;
