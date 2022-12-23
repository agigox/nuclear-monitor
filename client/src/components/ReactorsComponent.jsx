import React,{ useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import { connect } from 'react-redux';

function ReactorsComponent(props) {
  return(
    <Row>
      {true ? <div className='spinner'><Spin size="large" /></div> : <div>
      <Col span={8}>
        <div>
          <Row>
            <Col className="box" span={24}>Etat du parc nucléaire français</Col>
            <Col className="box" span={24}>Informations relatives au volume d’électricité produit</Col>
          </Row>
        </div>
      </Col>
      <Col span={16}>
        <div className="box">
        
        </div>
      </Col>
      </div>}
    </Row>
  )
}


const mapStateToProps = (state) => {
  return {
      reactors: state.reactors
  }
}

export default connect(mapStateToProps)(ReactorsComponent);
