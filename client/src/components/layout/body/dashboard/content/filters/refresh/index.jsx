import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import RefreshText from './RefreshText';
import Buttons from '../../../../../../utils/Buttons';
import { selectCategoriesPending } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import { refreshProductionCategories } from '../../../../../../../redux/reducers/productionCategoriesReducer';

function RefreshDate() {
  const categoriesPending = useSelector(selectCategoriesPending);
  const dispatch = useDispatch();
  const handleClick = async () => {
    dispatch(refreshProductionCategories());
  };

  return (
    <Row wrap={false}>
      <Col>
        <Buttons
          styling="refresh"
          icon={<ReloadOutlined />}
          loading={categoriesPending}
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
