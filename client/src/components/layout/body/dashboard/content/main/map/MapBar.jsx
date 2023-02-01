import { Col, Row } from 'antd';
import React from 'react';
import { useGetPokemonByNameQuery } from '../../../../../../../api/pokemon';

// import { useSelector } from 'react-redux';

function MapBars({ productionUnit }) {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  console.log(data, error, isLoading);
  /*
  const pmax = useSelector((state) =>
    selectPmaxByProductionUnit(state, productionUnit),
  );
  */
  return (
    <Row>
      <Col>{productionUnit}</Col>
    </Row>
  );
}

export default MapBars;
