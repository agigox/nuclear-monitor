import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { selectUnavailabilityOfCurrentCategoryByEicCode } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { selectProductionOfCurrentCategoryByEicCode } from '../../../../../../../redux/selectors/productionsSelectors';
import { formatNumberToFr } from '../../../../../../../utils';

const StyledRow = styled(Row)`
  .slice-content-col {
    color: white;
  }
`;
function SubSlice({ name, installedCapacity, eicCode }) {
  const [unavailability, setUnavailability] = useState(0);
  const [production, setProduction] = useState(0);
  const unavailabilityOfCurrentCategoryByEicCode = useSelector((state) =>
    selectUnavailabilityOfCurrentCategoryByEicCode(state, eicCode),
  );

  const productionOfCurrentCategoryByEicCode = useSelector((state) =>
    selectProductionOfCurrentCategoryByEicCode(state, eicCode),
  );

  useEffect(() => {
    if (!_.isUndefined(unavailabilityOfCurrentCategoryByEicCode)) {
      setUnavailability(
        unavailabilityOfCurrentCategoryByEicCode.unavailability
          .unavailable_capacity,
      );
    }
    if (productionOfCurrentCategoryByEicCode.lastProduction.value >= 0) {
      setProduction(productionOfCurrentCategoryByEicCode.lastProduction.value);
    }
  });
  const getClassName = () => {
    const availability = installedCapacity - unavailability;
    if (availability === 0) {
      return 'fully-slice';
    }
    if (production <= 0) {
      return 'production-down-slice';
    }
    if (availability - production <= 20) {
      // Pas d'indispo
      return 'up-slice';
    }
    return 'hashed-slice';
  };
  return (
    <StyledRow className="slice-content">
      <Col span={24} className="slice-content-pmax">
        Pmax: {formatNumberToFr(installedCapacity)}
      </Col>
      <Col span={24} className={`slice-content-col ${getClassName()}`}>
        <Row>
          <Col span={24} className="slice-content-capacity">
            {Math.round(production)} <span>MW</span>
          </Col>
          <Col className="slice-content-city" span={24}>
            {name}
          </Col>
        </Row>
      </Col>
    </StyledRow>
  );
}

export default SubSlice;
