import React from 'react';
import styled from '@emotion/styled';
// import Map from './map/Map';
import Map from './map/Map';

const Wrapper = styled.div`
  overflow-x: scroll;
`;

function Details() {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
}

export default Details;
