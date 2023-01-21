/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import _ from 'lodash';
import SubSlice from './SubSlice';

const Wrapper = styled.div`
  background: #f4f4f4;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  width: 100px;
  height: max-content;
  .plantName {
    text-align: center;
    text-transform: uppercase;
    padding: 6px;
    height: 25px;
    font-size: 12px;
    font-weight: bold;
  }
  .central {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;
function UnavailabilitySlice(props) {
  const { plant, availabilities, fullyDown, partiallyDown } = props;

  return (
    <Wrapper>
      <div className="plantName">{plant.replace('Saint', 'St')}</div>
      <div className="central">
        {_.sortBy(
          [...availabilities, ...fullyDown, ...partiallyDown],
          'name',
        ).map((availability) => (
          <SubSlice key={availability.name} availability={availability} />
        ))}
      </div>
    </Wrapper>
  );
}

export default UnavailabilitySlice;
