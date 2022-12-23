import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import PlantMap1 from './PlantMap1';

function NuclearParcsComponent({reactors}) {
  return(
    <Row>
      {reactors.map((reactor) => {
        return (<Col className='box nuclear-name' span={3} key={reactor.eicCode}>{reactor.name}</Col>)
      })}
      
    </Row>
  )
}




const mapStateToProps = (state) => {
  console.log(state)
  return {
      reactors: state.reactors
  }
}

export default connect(mapStateToProps)(NuclearParcsComponent);
