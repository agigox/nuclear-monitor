import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import RefreshText from './RefreshText';
import Buttons from '../../../../../../utils/Buttons';
import { selectCategoriesRefreshPending } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { refreshProductionCategories } from '../../../../../../../redux/reducers/productionCategoriesReducer';
import { RefreshIcon } from '../../../../../../utils/SVGs';

function RefreshDate() {
  const categoriesRefreshPending = useSelector(selectCategoriesRefreshPending);
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(refreshProductionCategories());
  };

  return (
    <Row wrap={false} className="refresh" align="middle" gutter={[19, 0]}>
      <Col>
        <Buttons
          styling="refresh"
          icon={<RefreshIcon />}
          loading={categoriesRefreshPending}
          clickHandler={() => handleClick()}
        />
      </Col>
      <Col>
        <RefreshText />
      </Col>
    </Row>
  );
}

export default RefreshDate;
