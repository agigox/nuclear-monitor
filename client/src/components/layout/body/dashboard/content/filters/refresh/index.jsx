import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import appActions from '../../../../../../../redux/actions';
import RefreshText from './RefreshText';

function RefreshDate() {
  const unavailabilitiesRefresh = useSelector(
    (state) => state.unavailabilities.loadings.unavailabilitiesRefresh,
  );
  const dispatch = useDispatch();
  const refreshUnavailabilities = async () => {
    dispatch(appActions.unavailabilitiesActions.refreshUnavailabilities());
  };

  return (
    <Row wrap={false}>
      <Col>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          loading={unavailabilitiesRefresh}
          onClick={() => refreshUnavailabilities()}
        />
      </Col>
      <Col>
        <RefreshText />
      </Col>
    </Row>
  );
}

export default RefreshDate;
