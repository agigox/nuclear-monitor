import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { changeDisplayToMap } from '../redux/actionCreators';



function ToggleDisplayComponent({ changeDisplayToMap }) {
  const toggleDisplay = e => {
    const mode = e.target.name === 'map';
    changeDisplayToMap(mode);
  };
  return (
    <div className="toggleBts">
      <Button name="map" onClick={toggleDisplay}>
        Carte
      </Button>
      <Button onClick={toggleDisplay}>Tranches</Button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  changeDisplayToMap: data => {
    dispatch(changeDisplayToMap(data));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(ToggleDisplayComponent);
