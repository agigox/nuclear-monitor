import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import appActions from '../../../../../../../redux/actions';
import RefreshText from './RefreshText';
import Buttons from '../../../../../../utils/Buttons';

function RefreshDate() {
  const unavailabilitiesRefresh = useSelector(
    (state) => state.unavailabilities.loadings.unavailabilitiesRefresh,
  );
  const dispatch = useDispatch();
  const refreshUnavailabilities = async () => {
    console.log('hello');
    dispatch(appActions.unavailabilitiesActions.refreshUnavailabilities());
  };

  return (
    <Row wrap={false}>
      <Col>
        <Buttons
          styling="refresh"
          icon={<ReloadOutlined />}
          loading={unavailabilitiesRefresh}
          clickHandler={() => refreshUnavailabilities()}
        />
      </Col>
      <Col>
        <RefreshText />
      </Col>
    </Row>
  );
}

export default RefreshDate;
