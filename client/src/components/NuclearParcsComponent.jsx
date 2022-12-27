import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
// import PlantMap1 from './PlantMap1';

// eslint-disable-next-line react/prop-types
function NuclearParcsComponent({ unavailabilities }) {
  return (
    <Row>
      {unavailabilities.map(reactor => {
        return (
          <Col className="box nuclear-name" span={3} key={reactor.eicCode}>
            {reactor.name}
          </Col>
        );
      })}
    </Row>
  );
}

const mapStateToProps = state => {
  return {
    unavailabilities: state.unavailabilities,
  };
};

export default connect(mapStateToProps)(NuclearParcsComponent);
