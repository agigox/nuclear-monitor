/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentReferentiel } from '../../../../../../../redux/selectors/referentielSelectors';
import Slice from './Slice';

function SlicesContent() {
  const currentReferentiel = useSelector(selectCurrentReferentiel);
  const { values: valuesRefrentiel } = currentReferentiel;
  return (
    <Row className="slices-content">
      {valuesRefrentiel.map((ref) => (
        <Col span={24} flex="94px" className="slices-content-col" key={ref.key}>
          <Slice name={ref.key} />
        </Col>
      ))}
    </Row>
  );
}

export default SlicesContent;
