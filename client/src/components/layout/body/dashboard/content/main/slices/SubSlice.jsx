import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { selectUnavailabilityOfCurrentCategoryByEicCode } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
// import { selectPerUnitItemOfCurrentCategoryByEicCode } from '../../../../../../../redux/selectors/productionsSelectors';

const StyledRow = styled(Row)`
  .slice-content-col {
    color: white;
  }
`;
function SubSlice({ name, installedCapacity, eicCode }) {
  const [unavailableCapacity, setUnavailableCapacity] = useState(0);
  const unavailabilityOfCurrentCategoryByEicCode = useSelector((state) =>
    selectUnavailabilityOfCurrentCategoryByEicCode(state, eicCode),
  );
  /*
  const productionOfCurrentCategoryByEicCode = useSelector((state) =>
    selectPerUnitItemOfCurrentCategoryByEicCode(state, eicCode),
  );
  */
  useEffect(() => {
    if (!_.isUndefined(unavailabilityOfCurrentCategoryByEicCode)) {
      setUnavailableCapacity(
        unavailabilityOfCurrentCategoryByEicCode.unavailability
          .unavailable_capacity,
      );
    } else {
      setUnavailableCapacity(0);
    }
  });
  const getClassName = () => {
    if (unavailableCapacity === 0) {
      return 'up-slice';
    }
    if (unavailableCapacity === installedCapacity) {
      return 'fully-slice';
    }
    return 'partially-slice';
  };
  return (
    <StyledRow className="slice-content">
      <Col span={24} className="slice-content-pmax">
        Pmax {installedCapacity}
      </Col>
      <Col span={24} className={`slice-content-col ${getClassName()}`}>
        <Row>
          <Col span={24} className="slice-content-capacity">
            <span>{installedCapacity - unavailableCapacity}</span> MW
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
