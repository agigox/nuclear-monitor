import React from 'react';
import { Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import PlantMap1 from './PlantMap1';
import { changeDisplayToMap } from '../redux/actionCreators';

function ToggleDisplayComponent({changeDisplayToMap}) {
  const toggleDisplay = (e) => {
    const mode = e.target.name === 'map' ? true : false;
    changeDisplayToMap(mode);
  }
  return(
    <>
      <Button name="map" onClick={toggleDisplay}>Carte</Button>
      <Button onClick={toggleDisplay}>Tranches</Button>
    </>
  )
}


const mapDispatchToProps = (dispatch) => ({
  changeDisplayToMap: (data) => {
    dispatch(changeDisplayToMap(data));
  },
});


export default connect(null, mapDispatchToProps)(ToggleDisplayComponent);
