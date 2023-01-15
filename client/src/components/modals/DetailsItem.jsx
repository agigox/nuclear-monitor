import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React from 'react';

const CustomRow = styled(Row)`
  .title-date {
    color: #818d9c;
  }
`;
function DetailsItem({ text, value }) {
  return (
    <CustomRow>
      <Col span={24} className="title-date">
        {text}
      </Col>
      <Col span={24}>{value}</Col>
    </CustomRow>
  );
}

export default DetailsItem;
