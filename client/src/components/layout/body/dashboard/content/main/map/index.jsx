import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SVGMap from '../../../../../../../images/map.svg';
import Rive1 from '../../../../../../../images/rive-1.svg';
import Rive2 from '../../../../../../../images/rive-2.svg';
import Rive3 from '../../../../../../../images/rive-3.svg';
import Rive4 from '../../../../../../../images/rive-4.svg';
import Rive5 from '../../../../../../../images/rive-5.svg';
import Rive6 from '../../../../../../../images/rive-6.svg';
import { selectCurrentCategory } from '../../../../../../../redux/selectors/crossSelectors';
import { selectDataByFieldAndProductionUnit } from '../../../../../../../redux/selectors/dataSelectors';
// import { groupByKey } from '../../../../../../../utils';

// import MapBar from './MapBar';
import PieChartItem from './PieChartItem';

const StyledRow = styled(Row)`
  .pie-chart {
    flex-direction: column;
    row-gap: 5px;
  }
  .map {
    position: absolute;
    left: 77.86px;
    top: 38px;
  }
`;
function Map() {
  const currentCategory = useSelector(selectCurrentCategory);
  const dataGroupedByField = useSelector((state) => {
    return selectDataByFieldAndProductionUnit(state, currentCategory);
  });
  return (
    <Row>
      <Col className="map-container" span={24}>
        <img src={SVGMap} alt="map" className="map" />
        {['HYDRAULICS', 'ALL'].includes(currentCategory) && (
          <>
            <img src={Rive1} alt="rive-1" className="rive-1 rives" />
            <img src={Rive2} alt="rive-2" className="rive-2 rives" />
            <img src={Rive3} alt="rive-3" className="rive-3 rives" />
            <img src={Rive4} alt="rive-4" className="rive-4 rives" />
            <img src={Rive5} alt="rive-5" className="rive-5 rives" />
            <img src={Rive6} alt="rive-6" className="rive-6 rives" />
          </>
        )}
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
          const getSize = () => {
            if (productionUnitPmax > 3000) {
              return 54;
            }
            if (productionUnitPmax > 1500) {
              return 40;
            }
            if (productionUnitPmax > 500) {
              return 34;
            }
            return 20;
          };
          return (
            <StyledRow
              key={key}
              className={`${itemClass} mark-city ${values[0].productionCategory.toLowerCase()} circle-${getSize()}`}
            >
              <Col style={{ alignSelf: 'center' }}>
                <Row className="pie-chart">
                  <Col>
                    <PieChartItem
                      data={data}
                      productionUnitName={key}
                      pmax={productionUnitPmax}
                    />
                  </Col>
                  {/* values[0].productionCategory.toLowerCase() ===
                    'hydraulics' &&
                    <Col className="hydraulics-number">
                      x{groupByKey(values, 'productionUnit').length}
                    </Col> */}
                </Row>
              </Col>
            </StyledRow>
          );
        })}
      </Col>
    </Row>
  );
}

export default Map;
