import React from 'react';
import { Col, Row } from 'antd';

import Infos from './Infos';

function Position(props) {
  const { plant, availabilities, fullyDown, partiallyDown } = props;
  return (
    <Row className="position">
      <Col span={24}>{plant.replace('Saint', 'St')}</Col>
      <Col span={24}>
        <Infos
          availabilities={availabilities}
          fullyDown={fullyDown}
          partiallyDown={partiallyDown}
        />
      </Col>
    </Row>
  );
}

export default Position;
