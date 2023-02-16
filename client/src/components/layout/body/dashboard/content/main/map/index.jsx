import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import SVGMap from '../../../../../../../images/map.svg';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import { selectDataByProductionCategoryAndProductionUnit } from '../../../../../../../redux/selectors/dataSelectors';
import MapBar from './MapBar';

function Map() {
  const currentCategory = useSelector(selectCurrentCategory);
  const dataByCategory = useSelector((state) => {
    return selectDataByProductionCategoryAndProductionUnit(
      state,
      currentCategory,
    );
  });
  return (
    <Row>
      <Col className="map-container" span={24}>
        <img src={SVGMap} alt="map" />
        {dataByCategory.values
          .filter((item) => {
            return item.key !== 'REVIN';
          })
          .map((referentielItem) => {
            const productionUnitPmax = referentielItem.values.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue.pmax;
              },
              0,
            );
            const unavailabilityUnitProduction = referentielItem.values.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue.unavailableCapacity;
              },
              0,
            );
            const productionUnitProduction = referentielItem.values.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue.productionCapacity;
              },
              0,
            );
            const { key } = referentielItem;
            console.log(referentielItem);
            return (
              <Row
                key={key}
                className={`${key
                  .toLowerCase()
                  .split(' ')
                  .join('')
                  .split("'")
                  .join('')} mark-city`}
                style={{ columnGap: '5px' }}
              >
                <Col style={{ alignSelf: 'center' }}>
                  <MapBar
                    productionUnitName={key}
                    productionUnitPmax={productionUnitPmax}
                    unavailabilityUnitProduction={unavailabilityUnitProduction}
                    productionUnitProduction={productionUnitProduction}
                  />
                </Col>
              </Row>
            );
          })}
      </Col>
    </Row>
  );
}

export default Map;
