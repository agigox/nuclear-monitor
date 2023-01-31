/* eslint-disable no-unused-vars */
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryGenerationUnitsNumber } from '../../../../../../../redux/selectors/referentielSelectors';
import Buttons from '../../../../../../utils/Buttons';
import BottomSiderBody from './BottomSiderBody';

function BottomSider() {
  const currentTotal = useSelector(selectCurrentCategoryGenerationUnitsNumber);
  return (
    <Row style={{ rowGap: '32px' }}>
      <Col>
        <BottomSiderBody />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons styling="summary" disabled>
          Total : {currentTotal}
        </Buttons>
      </Col>
    </Row>
  );
}

export default BottomSider;
