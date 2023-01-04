import React from 'react';
import { Layout } from 'antd';
import Infos from './Infos';

const { Sider } = Layout;

function Overview() {
  return (
    <Sider width={400} theme="light">
      <Infos type="refresh" />
      <Infos type="reactor" />
      <Infos type="power" />
    </Sider>
  );
}

export default Overview;
