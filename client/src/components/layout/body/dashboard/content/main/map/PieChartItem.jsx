/* eslint-disable react/no-array-index-key */
import { Row } from 'antd';
import React from 'react';
// import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { ProductionCategoriesKeys } from '../../../../../../../enums/ProductionCategories';
// import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import BarIndication from './BarIndication';

// const COLORS = ['#0079D1', '#00C49F', '#FFBB28'];

function PieChartItem({ data, productionUnitName, category }) {
  const currentCategory = category;
  const handleClick = () => {
    // console.log('A click');
    return 33;
  };
  const getSize = () => {
    switch (currentCategory) {
      case ProductionCategoriesKeys.NUCLEAR || ProductionCategoriesKeys.ALL:
        return 54;
      case ProductionCategoriesKeys.FOSSIL_HARD_COAL:
        return 34;
      case ProductionCategoriesKeys.HYDRAULICS:
        return 34;
      case ProductionCategoriesKeys.FOSSIL_GAS:
        return 40;
      case ProductionCategoriesKeys.TIDAL:
        return 20;
      case ProductionCategoriesKeys.FOSSIL_OIL:
        return 34;
      default:
        return 40;
    }
  };
  const size = getSize();
  if (productionUnitName === 'BUGEY') {
    console.log(data);
  }

  return (
    <Row>
      <PieChart width={size} height={size} onMouseEnter={handleClick}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={size / 2}
          fill="#8884d8"
          dataKey="value"
        >
          {[...data].map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={entry.color} />;
          })}
        </Pie>
        <Tooltip
          content={
            <BarIndication
              productionUnitName={productionUnitName}
              productionUnitPmax={1}
              down={2}
              prod={3}
            />
          }
        />
      </PieChart>
    </Row>
  );
}

export default PieChartItem;
