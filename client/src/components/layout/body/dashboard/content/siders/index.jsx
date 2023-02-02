import styled from '@emotion/styled';
import { Card, Col, Row } from 'antd';
import React from 'react';
import BottomSider from './bottom-sider';
import TopSider from './top-sider';

const StyledRow = styled(Row)`
  .top-card {
    .ant-card-body {
      padding-right: 25px;
    }
  }
  .bottom-card {
    .ant-card-body {
      padding-top: 15px;
    }
  }
`;
function Siders() {
  return (
    <StyledRow style={{ rowGap: '16px' }}>
      <Col span={24}>
        <Card bordered={false} className="top-card">
          <TopSider />
        </Card>
      </Col>
      <Col span={24}>
        <Card
          title="Moyen de production"
          bordered={false}
          className="bottom-card"
        >
          <BottomSider />
        </Card>
      </Col>
    </StyledRow>
  );
}

export default Siders;
