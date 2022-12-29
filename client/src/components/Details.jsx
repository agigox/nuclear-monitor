import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import Slices from './Slices';
import Map from './map/Map';

const { Content } = Layout;

function Details() {
  const mode = useSelector((state) => state.cross.mode);
  return <Content>{mode ? <Map /> : <Slices />}</Content>;
}

export default Details;
