import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCategoryPmaxCapacity } from '../../../../../../../redux/selectors/pmaxSelectors';
import { selectUnavailabilitiesOfCurrentCategoryCapacity } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
// eslint-disable-next-line no-unused-vars
import { selectPerProductionTypeItemsOfCurrentCategory } from '../../../../../../../redux/selectors/productionsSelectors';
import Buttons from '../../../../../../utils/Buttons';

function TopSiderButtons() {
  const currentDownCapacity = useSelector(
    selectUnavailabilitiesOfCurrentCategoryCapacity,
  );

  // la puissance du referentiel
  const currentPmax = useSelector(selectCurrentCategoryPmaxCapacity);

  const currentCategoryLastProduction = useSelector(
    selectPerProductionTypeItemsOfCurrentCategory,
  ).lastProduction;
  console.log(currentCategoryLastProduction);
  const toPercent = (number) => Math.round((number * 100) / currentPmax);
  return (
    <Row>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons styling="summary" disabled>
          Part de production : {toPercent(currentCategoryLastProduction)} %{' '}
          <br />
          Part de disponible :{' '}
          {toPercent(
            currentPmax - currentDownCapacity - currentCategoryLastProduction,
          )}{' '}
          %
        </Buttons>
      </Col>
    </Row>
  );
}

export default TopSiderButtons;
