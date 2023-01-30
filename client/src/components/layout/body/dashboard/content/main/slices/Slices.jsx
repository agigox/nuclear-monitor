import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentReferentiel } from '../../../../../../../redux/selectors/referentielSelectors';
import Slice from './Slice';

function Slices() {
  const currentReferentiel = useSelector(selectCurrentReferentiel);
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
