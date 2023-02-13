import { Col, Row } from 'antd';
import React from 'react';
import SubSlice from './SubSlice';

function Slice({ data }) {
  return (
    <Row className="slice">
      <Col className="slice-title" span={24}>
        {data.key}
      </Col>
      <Col span={24}>
        <Row className="slice-content-row">
          {data.values.map((value) => {
            return (
              <SubSlice
                key={value.eicIndispoGroup}
                name={value.name}
                pmax={value.pmax}
                production={value.productionCapacity}
                available={value.availableCapacity}
              />
            );
          })}
        </Row>
      </Col>
    </Row>
  );
}

export default Slice;
