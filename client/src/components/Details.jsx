import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Slices from './Slices';
// import Map from './map/Map';
import Map1 from './map/Map1';

const Wrapper = styled.div`
  overflow-x: scroll;
`;

function Details() {
  const mode = useSelector((state) => state.cross.mode);
  return <Wrapper>{mode ? <Map1 /> : <Slices />}</Wrapper>;
}

export default Details;
