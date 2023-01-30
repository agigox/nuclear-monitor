import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectGenerationUnitsByProductionUnit } from '../../../../../../../redux/selectors/referentielSelectors';
import SubSlice from './SubSlice';

function Slice({ name }) {
  const productionUnitGenerationUnits = useSelector((state) =>
    selectGenerationUnitsByProductionUnit(state, name),
  );
  return (
    <Row className="slice">
      <Col className="slice-title" span={24}>
        {name}
      </Col>
      <Col span={24}>
        <Row className="slice-content-row">
          {productionUnitGenerationUnits.map(
            ({ name: unitName, eicCode, installedCapacity }) => (
              <SubSlice
                key={eicCode}
                name={unitName}
                eicCode={eicCode}
                installedCapacity={installedCapacity}
              />
            ),
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default Slice;
