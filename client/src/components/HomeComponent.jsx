import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import NuclearParcsComponent from './NuclearParcsComponent';
import ToggleViewComponent from './ToggleDisplayComponent';
import PlantMap1 from './PlantMap1';

function HomeComponent({displayMap}) {
  return(
    <Row>
        <ToggleViewComponent />
        <Col span={4}>
        <div>
            <Row>
                <Col className="box" span={24}>Etat du parc nucléaire français</Col>
                <Col className="box" span={24}>Informations relatives au volume d’électricité produit</Col>
            </Row>
        </div>
        </Col>
        <Col span={20}>
            <div className="box">
                
                
                {displayMap ? <PlantMap1 /> : <NuclearParcsComponent />}
            </div>
        </Col>
        
    </Row>
  )
}




const mapStateToProps = (state) => {
  return {
      displayMap: state.displayMap
  }
}

export default connect(mapStateToProps)(HomeComponent);
