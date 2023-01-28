import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryPmax } from '../../../../../../../redux/selectors/pmaxSelectors';
import { selectCurrentDownCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentCategoryLastProduction } from '../../../../../../../redux/selectors/productionsSelectors';
import Buttons from '../../../../../../utils/Buttons';

function TopSiderButtons() {
  const currentDownCapacity = useSelector(selectCurrentDownCapacity);
  // la puissance du referentiel
  const currentPmax = useSelector(selectCurrentCategoryPmax);
  const currentCategoryLastProduction = useSelector(
    selectCurrentCategoryLastProduction,
  );
  const toPercent = (number) => Math.round((number * 100) / currentPmax);
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons styling="summary" disabled>
          Part de production : {100 - toPercent(currentCategoryLastProduction)}{' '}
          %
        </Buttons>
        <Buttons styling="summary" disabled>
          Part de disponible : {100 - toPercent(currentDownCapacity)} %
        </Buttons>
      </Col>
    </Row>
  );
}

export default TopSiderButtons;
