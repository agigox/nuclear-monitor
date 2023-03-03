import React from 'react';
import { useSelector } from 'react-redux';

import { Col, Row } from 'antd';
import styled from 'styled-components';
import { SectorItem } from './SectorItem';
import { selectDataByProductionCategory } from '../../../redux/selectors/dataSelectors';

const CustomRow = styled(Row)`
  row-gap: 12px;
  .marker {
    width: 16px;
    height: 16px;
    border-radius: 2px;
    margin-right: 6px;
    &.prod {
      background: linear-gradient(91.66deg, #36c90a 10.18%, #46ea54 91.31%);
    }
    &.dispo {
      background: linear-gradient(91.66deg, #0079d1 10.18%, #009dd1 91.31%);
    }
    &.indispo {
      background: linear-gradient(91.66deg, #d0574f 10.18%, #d0574f 91.31%);
    }
  }
`;
function SectorDetails() {
  const categories = useSelector(selectDataByProductionCategory);
  return (
    <CustomRow className="secteur-details">
      <Col span={24}>
        <Row
          align="middle"
          justify="space-between"
          style={{ marginBottom: '35px' }}
        >
          <Col flex="313px" className="sector-title">
            Dètails par filière
          </Col>
          <Col flex="auto">
            <Row justify="end">
              <Col>
                <Row>
                  <Col className="marker prod" />
                  <Col className="marks-text">Production</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col className="marker dispo" />
                  <Col className="marks-text">Disponible</Col>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col className="marker indispo" />
                  <Col className="marks-text">Indisponible</Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {categories
          .filter((category) => {
            return category.key !== 'ALL';
          })
          .map((category) => {
            return <SectorItem key={category.key} sector={category.key} />;
          })}
      </Col>
    </CustomRow>
  );
}

export default SectorDetails;
