import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFullyDownTotal,
  selectCurrentPartiallyDownTotal,
} from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectCurrentTotal } from '../../../../../../../redux/selectors/referentielSelectors';

function BottomSiderBody() {
  const currentFullyDownTotal = useSelector(selectCurrentFullyDownTotal);
  const currentPartiallyDownTotal = useSelector(
    selectCurrentPartiallyDownTotal,
  );
  const currentTotal = useSelector(selectCurrentTotal);

  return (
    <Row>
      <Col>
        <Row>
          <Col className="up-mark" />
          <Col>En fonctionnement</Col>
          <Col>
            {currentTotal - currentPartiallyDownTotal - currentFullyDownTotal}
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="partially-mark" />
          <Col>En fonctionnement partiel</Col>
          <Col>{currentPartiallyDownTotal}</Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col className="fully-mark" />
          <Col>En arrêt complet</Col>
          <Col>{currentFullyDownTotal}</Col>
        </Row>
      </Col>
    </Row>
  );
}

export default BottomSiderBody;
