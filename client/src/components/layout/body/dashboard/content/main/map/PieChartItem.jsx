/* eslint-disable react/no-array-index-key */
import { Row } from 'antd';
import React from 'react';
// import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import BarIndication from './BarIndication';

function PieChartItem({ data, productionUnitName, pmax }) {
  console.log(data);
  const handleClick = () => {
    // console.log('A click');
    return 33;
  };
  const getSize = () => {
    if (pmax > 3000) {
      return 54;
    }
    if (pmax > 1500) {
      return 40;
    }
    if (pmax > 500) {
      return 34;
    }
    return 20;
  };
  const size = getSize();
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
              productionUnitPmax={pmax}
              down={data[1].value}
              prod={data[2].value}
            />
          }
          style={{ zIndex: 99 }}
        />
      </PieChart>
    </Row>
  );
}

export default PieChartItem;
