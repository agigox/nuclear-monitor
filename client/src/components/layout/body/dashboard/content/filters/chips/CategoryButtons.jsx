/* eslint-disable no-prototype-builtins */
import { Col, Row } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import { changeCurrentCategory } from '../../../../../../../redux/reducers/crossReducer';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import { selectItems } from '../../../../../../../redux/selectors/productionCategoriesSelectors';
import Buttons from '../../../../../../utils/Buttons';

function CategoryButtons() {
  const dispatch = useDispatch();
  const categories = useSelector(selectItems);
  const currentCategory = useSelector(selectCurrentCategory);
  const handleClick = (category) => {
    dispatch(changeCurrentCategory(category));
  };
  return (
    <Row gutter={[13, 0]}>
      {categories.map((category) => (
        <Col key={category.key}>
          <Buttons
            styling="chips"
            clickHandler={() => handleClick(category.key)}
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

export default CategoryButtons;
