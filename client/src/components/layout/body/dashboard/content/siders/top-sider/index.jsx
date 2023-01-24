import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFullyDownPower,
  selectCurrentPartiallyDownPower,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentPower } from '../../../../../../../redux/selectors/referentielSelectors';
import Buttons from '../../../../../../utils/Buttons';
import TopSiderBody from './TopSiderBody';

function TopSider() {
  const currentFullyDownPower = useSelector(selectCurrentFullyDownPower);
  const currentPartiallyDownPower = useSelector(
    selectCurrentPartiallyDownPower,
  );
  // la puissance du referentiel
  const currentPower = useSelector(selectCurrentPower);
  return (
    <Row gutter={[0, 27]}>
      <Col span={24}>
        <TopSiderBody />
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Buttons styling="summary">
          Part de capacité disponible :{' '}
          {100 -
            Math.round(
              ((currentFullyDownPower + currentPartiallyDownPower) * 100) /
                currentPower,
            )}{' '}
          %
        </Buttons>
      </Col>
    </Row>
  );
}

export default TopSider;
