import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import Slices from './Slices';

function SlicesBody() {
  const currentCategory = useSelector(selectCurrentCategory);

  return (
    <Row className="slices" style={{ rowGap: '17px' }}>
      <Col
        span={24}
        className="slices-title-page"
      >{`Filière ${ProductionCategories[currentCategory]}`}</Col>
      <Col span={24}>
        <Slices />
      </Col>
    </Row>
  );
}

export default SlicesBody;
