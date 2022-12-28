import React from 'react';
import { Layout } from 'antd';
import Infos from './Infos';

const { Sider } = Layout;

function Overview() {
  return (
    <Sider width={400} theme="light">
      <Infos title="Etat du parc nucléaire français" />
      <Infos title="Informations relatives au volume d’électricité produit" />
    </Sider>
  );
}

export default Overview;
