import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductionCategories } from '../../../../../../../enums/ProductionCategories';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import { selectGroupedUnavailabilitiesByProductionType } from '../../../../../../../redux/selectors/dataSelectors';
import Slices from './Slices';

function SlicesBody() {
  const currentCategory = useSelector(selectCurrentCategory);
  const unavailabilities = useSelector(
    selectGroupedUnavailabilitiesByProductionType,
  );
  return (
    <Row className="slices" style={{ rowGap: '17px' }}>
      {currentCategory === 'ALL' ? (
        unavailabilities
          .filter(({ key }) => {
            return key !== 'ALL';
          })
          .map((item) => {
            const { key } = item;

            return (
              <Col key={key} span={24}>
                <Row>
                  <Col
                    span={24}
                    className="slices-title-page"
                  >{`Filière ${ProductionCategories[key]}`}</Col>
                  <Col span={24}>
                    <Slices category={key} />
                  </Col>
                </Row>
              </Col>
            );
          })
      ) : (
        <Col span={24}>
          <Row>
            <Col
              span={24}
              className="slices-title-page"
            >{`Filière ${ProductionCategories[currentCategory]}`}</Col>
            <Col span={24}>
              <Slices category={currentCategory} />
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
}

export default SlicesBody;
