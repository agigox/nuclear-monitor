/* eslint-disable no-prototype-builtins */
import { Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import appActions from '../../../../../../../redux/actions';
import Buttons from '../../../../../../utils/Buttons';

function TypeButtons() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.productionCategories.items);
  const currentCategory = useSelector((state) => state.cross.currentCategory);
  const changeCurrentCategory = (category) => {
    dispatch(appActions.crossActions.changeCurrentCategory(category));
  };
  return (
    <Row>
      {categories.map((category) => (
        <Col key={category.key}>
          <Buttons
            styling="chips"
            clickHandler={() => changeCurrentCategory(category.key)}
            active={currentCategory === category.key}
          >
            {ProductionCategories.hasOwnProperty(category.key)
              ? ProductionCategories[category.key]
              : category.key}
          </Buttons>
        </Col>
      ))}
    </Row>
  );
}

export default TypeButtons;
