import { Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUnavailabilities } from '../../../../../../../redux/selectors/crossSelectors';
import UnavailabilitySlice from './Slice';

function Slices() {
  const currentUnavailabilities = useSelector(selectCurrentUnavailabilities);
  console.log(currentUnavailabilities);
  return (
    <Row>
      {[].map((unavailability) => {
        const {
          plant,
          availabilities,
          unavailabilities: { fullyDown, partiallyDown },
        } = unavailability;
        return (
          <UnavailabilitySlice
            key={plant}
            plant={plant}
            availabilities={availabilities}
            fullyDown={fullyDown}
            partiallyDown={partiallyDown}
          />
        );
      })}
    </Row>
  );
}

export default Slices;
