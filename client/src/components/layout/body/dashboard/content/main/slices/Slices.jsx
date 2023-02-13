import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import Slice from './Slice';
import { selectDataByCategoryAndProductionUnit } from '../../../../../../../redux/selectors/dataSelectors';

function Slices({ category }) {
  const dataByCategory = useSelector((state) => {
    return selectDataByCategoryAndProductionUnit(state, category);
  });
  return (
    <Row className="slices-content">
      {dataByCategory.values.map((data) => {
        // debugger;
        return (
          <Col
            span={24}
            flex="94px"
            className="slices-content-col"
            key={data.key}
          >
            <Slice data={data} />
          </Col>
        );
      })}
    </Row>
  );
}

export default Slices;
