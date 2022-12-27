/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUnavailabilities } from '../redux/actionCreators';
import LoadingComponent from './LoadingComponent';
import HomeComponent from './HomeComponent';

function AppLayout1(props) {
  // eslint-disable-next-line no-shadow
  const { loadUnavailabilities, loadings } = props;
  useEffect(() => loadUnavailabilities(), []);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{loadings.unavailabilities ? <LoadingComponent /> : <HomeComponent />}</>
  );
}

const mapStateToProps = state => {
  return {
    loadings: state.loadings,
  };
};

const mapDispatchToProps = dispatch => ({
  loadUnavailabilities: () => {
    dispatch(loadUnavailabilities());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppLayout1);
