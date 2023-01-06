import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Slices from './Slices';
import Map from './map/Map';

const Wrapper = styled.div`
  overflow-x: scroll;
`;

function Details() {
  const mode = useSelector((state) => state.cross.mode);
  return <Wrapper>{mode ? <Map /> : <Slices />}</Wrapper>;
}

export default Details;
