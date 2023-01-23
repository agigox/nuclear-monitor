import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/referentielSelectors';
import SlicesContent from './SlicesContent';

function Slices() {
  const currentCategory = useSelector(selectCurrentCategory);

  return (
    <Row>
      <Col span={24}>{`Filière ${ProductionCategories[currentCategory]}`}</Col>
      <Col psan={24}>
        <SlicesContent />
      </Col>
    </Row>
  );
}

export default Slices;
