import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFullyDownPower,
  selectCurrentPartiallyDownPower,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentPower } from '../../../../../../../redux/selectors/referentielSelectors';

function TopSiderBody() {
  const currentFullyDownPower = useSelector(selectCurrentFullyDownPower);
  const currentPartiallyDownPower = useSelector(
    selectCurrentPartiallyDownPower,
  );
  const currentPower = useSelector(selectCurrentPower);

  return (
    <Row>
      <Col>
        <Row>
          <Col className="up-mark" />
          <Col>En fonctionnement</Col>
          <Col>{currentFullyDownPower + currentPartiallyDownPower}</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="partially-mark" />
          <Col>En fonctionnement partiel</Col>
          <Col>{currentPower}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TopSiderBody;
