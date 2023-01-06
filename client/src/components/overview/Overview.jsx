import React from 'react';
import Infos from './Infos';

function Overview() {
  return (
    <div>
      <Infos type="refresh" />
      <Infos type="reactor" />
      <Infos type="power" />
    </div>
  );
}

export default Overview;
