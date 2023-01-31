import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentReferentiel } from '../../../../../../../redux/selectors/referentielSelectors';
import Slice from './Slice';

function Slices() {
  const currentReferentiel = useSelector(selectCurrentReferentiel);
  /*
  const sum = currentReferentiel.reduce((accumulator, currentValue) => {
    const a = currentValue.values.reduce(
      (accumulator1, currentValue1) =>
        accumulator1 + Number(currentValue1.netPower_MW),
      0,
    );
    return accumulator + a;
  }, 0);
  */
  return (
    <Row className="slices-content">
      {currentReferentiel.map((ref) => (
        <Col span={24} flex="94px" className="slices-content-col" key={ref.key}>
          <Slice name={ref.key} />
        </Col>
      ))}
    </Row>
  );
}

export default Slices;
