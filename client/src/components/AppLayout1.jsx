/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadRectors } from '../redux/actionCreators';
import LoadingComponent from './LoadingComponent';
import HomeComponent from './HomeComponent';

function AppLayout1(props) {
  // eslint-disable-next-line react/prop-types
  const { loadReactors, loadings } = props;
  useEffect(() => loadReactors(), []);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{loadings.unavailibilities ? <LoadingComponent /> : <HomeComponent />}</>
  );
}

const mapStateToProps = state => {
  return {
    loadings: state.loadings,
  };
};

const mapDispatchToProps = dispatch => ({
  loadReactors: () => {
    dispatch(loadRectors());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppLayout1);
