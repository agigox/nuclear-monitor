import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NuclearParcsComponent from './NuclearParcsComponent';
import ToggleViewComponent from './ToggleDisplayComponent';
import PlantMap from './PlantMap';

const CustomCol = styled.col`
  text-align: center;
`;

function HomeComponent({ displayMap }) {
  return (
    <Row>
      <Col span={4}>
        <div>
          <Row>
            <Col className="box" span={24}>
              Etat du parc nucléaire français
            </Col>
            <Col className="box" span={24}>
              Informations relatives au volume d’électricité produit
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={20}>
        <Row>
          <Col span={24} className="toggleBts">
            <ToggleViewComponent />
          </Col>
          <Col span={24}>
            {displayMap ? <PlantMap /> : <NuclearParcsComponent />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
HomeComponent.defaultProps = {
  displayMap: true,
};
HomeComponent.propTypes = {
  displayMap: PropTypes.bool,
};
const mapStateToProps = state => {
  return {
    displayMap: state.displayMap,
  };
};

export default connect(mapStateToProps)(HomeComponent);
