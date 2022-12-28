import React from 'react';
import { Layout } from 'antd';
import ModeSwitcher from './ModeSwitcher';
import Details from './Details';

function Main() {
  return (
    <Layout>
      <ModeSwitcher />
      <Details />
    </Layout>
  );
}

export default Main;
