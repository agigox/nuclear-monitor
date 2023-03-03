import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { DisplayModes } from '../../../../../../enums/DisplayModes';
import { selectDisplayMode } from '../../../../../../redux/selectors/crossSelectors';
import Map from './map';
import SlicesBody from './slices';

const StyledRow = styled(Row)`
  .map-box {
    /*
    padding-top: 38px;
    padding-bottom: 34.12px;
    */
  }
`;
function Main() {
  const displayMode = useSelector(selectDisplayMode);
  return (
    <StyledRow className="main">
      <Col className="map-box" span={24}>
        {displayMode === DisplayModes.MAP && <Map />}
      </Col>
      <Col span={24}>
        {displayMode === DisplayModes.SLICES && <SlicesBody />}
      </Col>
    </StyledRow>
  );
}

export default Main;
