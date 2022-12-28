import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import Slices from './Slices';
import Map from './map/Map';

const { Content } = Layout;

function Details() {
  const displayMap = useSelector((state) => state.others.displayMap);
  return <Content>{displayMap ? <Map /> : <Slices />}</Content>;
}

export default Details;
