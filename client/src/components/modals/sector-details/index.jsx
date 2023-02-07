import React from 'react';
import { useSelector } from 'react-redux';
import General from '../General';

import { SectorItem } from './SectorItem';
import { selectItems } from '../../../redux/selectors/productionCategoriesSelectors';

function SectorDetails() {
  const categories = useSelector(selectItems);
  return (
    <General title="Région x" className="secteur-details">
      {categories
        .filter((category) => category.key !== 'ALL')
        .map((category) => (
          // eslint-disable-next-line no-debugger
          // debugger;
          <SectorItem key={category.key} sector={category.key} />
        ))}
    </General>
  );
}

export default SectorDetails;
