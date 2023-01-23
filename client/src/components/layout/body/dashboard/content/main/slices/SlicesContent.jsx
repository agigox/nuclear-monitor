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
    <Row>
      <Col>
        {valuesRefrentiel.map((ref) => (
          <Slice key={ref.key} name={ref.key} />
        ))}
      </Col>
    </Row>
  );
}

export default SlicesContent;
