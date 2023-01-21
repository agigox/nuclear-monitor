import { Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import UnavailabilitySlice from './Slice';

function Slices() {
  const unavailabilities = useSelector(
    (state) => state.unavailabilities.unavailabilities,
  );
  return (
    <Row>
      {unavailabilities.map((unavailability) => {
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
