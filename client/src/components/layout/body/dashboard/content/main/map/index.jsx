import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
// import SVGMapHydro from '../../../../../../../images/Frame.svg';
import SVGMap from '../../../../../../../images/map.svg';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import { selectDataByFieldAndProductionUnit } from '../../../../../../../redux/selectors/dataSelectors';

// import MapBar from './MapBar';
import PieChartItem from './PieChartItem';

function Map() {
  const currentCategory = useSelector(selectCurrentCategory);
  const dataGroupedByField = useSelector((state) => {
    return selectDataByFieldAndProductionUnit(state, currentCategory);
  });
  // console.log(dataGroupedByField);
  return (
    <Row>
      <Col className="map-container" span={24}>
        <img
          src={
            ['HYDRAULICS', 'ALL'].includes(currentCategory) ? SVGMap : SVGMap
          }
          alt="map"
          className="map"
        />
        {dataGroupedByField.values.map((referentielItem) => {
          const { key, values } = referentielItem;
          const productionUnitPmax = values.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.pmax;
            },
            0,
          );
          const unavailabilityUnitProduction = values.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.unavailableCapacity;
            },
            0,
          );
          const productionUnitProduction = values.reduce(
            (accumulator, currentValue) => {
              return accumulator + currentValue.productionCapacity;
            },
            0,
          );

          const data = [
            {
              name: 'Available',
              value:
                productionUnitPmax -
                unavailabilityUnitProduction -
                productionUnitProduction,
              color: '#0079D1',
            },
            {
              name: 'Unavailable',
              value: unavailabilityUnitProduction,
              color: '#D0574F',
            },
            {
              name: 'Prod',
              value: productionUnitProduction,
              color: '#41e03e',
            },
            // { name: 'Pmax', value: productionUnitPmax },
          ];
          const itemClass = key
            .toLowerCase()
            .split(' ')
            .join('')
            .split("'")
            .join('')
            .split('ô')
            .join('o')
            .split(/é|è/)
            .join('e');
          return (
            <Row
              key={key}
              className={`${itemClass} mark-city ${values[0].productionCategory.toLowerCase()}`}
            >
              <Col style={{ alignSelf: 'center' }}>
                <PieChartItem
                  data={data}
                  productionUnitName={key}
                  category={values[0].productionCategory}
                  itemClass={itemClass}
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
