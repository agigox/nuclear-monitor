import React from 'react';
import { useSelector } from 'react-redux';

import { Row } from 'antd';
import styled from 'styled-components';
import { SectorItem } from './SectorItem';
import { selectDataByProductionCategory } from '../../../redux/selectors/dataSelectors';

const CustomRow = styled(Row)`
  row-gap: 12px;
`;
function SectorDetails() {
  const categories = useSelector(selectDataByProductionCategory);
  return (
    <CustomRow className="secteur-details">
      {categories
        .filter((category) => {
          return category.key !== 'ALL';
        })
        .map((category) => {
          return <SectorItem key={category.key} sector={category.key} />;
        })}
    </CustomRow>
  );
}

export default SectorDetails;
