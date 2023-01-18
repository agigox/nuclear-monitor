import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styled from '@emotion/styled';
import appActions from '../../../../../../redux/actions';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .date {
    font-size: 16px;
    color: #3e25a3;
    font-weight: 700;
  }
  @media only screen and (max-width: 767px) {
    align-items: flex-end;
    & > .date {
      position: relative;
      top: 5px;
    }
  }
`;
function RefreshDate() {
  const lastRefreshDate = useSelector(
    (state) => state.unavailabilities.lastRefreshDate,
  );
  const unavailabilitiesRefresh = useSelector(
    (state) => state.unavailabilities.loadings.unavailabilitiesRefresh,
  );
  const dispatch = useDispatch();
  const refreshUnavailabilities = async () => {
    dispatch(appActions.unavailabilitiesActions.refreshUnavailabilities());
  };

  return (
    <StyledDiv>
      <div className="date">{lastRefreshDate}</div>
      <div>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          loading={unavailabilitiesRefresh}
          onClick={() => refreshUnavailabilities()}
        >
          RAFRAICHIR
        </Button>
      </div>
    </StyledDiv>
  );
}

export default RefreshDate;
