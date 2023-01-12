/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import { FullyDown, Warning } from '../SVGs';

const Wrapper = styled.div`
  .plant {
    height: 54px;
    width: 102px;
    margin: 3px 10px 3px 3px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-end;
    justify-content: space-between;
    align-items: flex-end;
    padding: 3px;
  }
  .Up {
    background: linear-gradient(203.32deg, #1cfc4d 19.29%, #25c548 81.34%);
  }
  .FullyDown {
    background: linear-gradient(203.32deg, #ff0900 19.29%, #bc372e 81.34%);
  }
  .PartiallyDown {
    background: linear-gradient(203.32deg, #ff6600 19.29%, #ff8b3d 81.34%);
    /*background: ${(props) =>
      props.primary
        ? 'linear-gradient(to top, #FF0900 19.29%, #BC372E 81.34%)'
        : 'white'};*/
  }
  .div1,
  .div2 {
    text-align: right;
  }
  .div1 {
    color: #810909;
    font-weight: bold;
  }
  .div2 {
    height: 19px;
  }
  .pmax {
    font-size: 10px;
    text-align: right;
    margin-right: 10px;
    position: relative;
    top: 5px;
    font-style: italic;
    color
  }
  .div4 {
    display: flex;
  }
  .div3 {
    align-self: center;
  }
`;
function Slice(props) {
  const {
    availability: { name, installedCapacity, availableCapacity },
  } = props;
  let type = 'Up';
  if (availableCapacity === 0) {
    type = 'FullyDown';
  } else if (availableCapacity < installedCapacity) {
    type = 'PartiallyDown';
  }
  return (
    <Wrapper>
      <div className="pmax">Pmax {installedCapacity} MW</div>
      <div className="div4">
        <div className="div3">{name.split(' ').pop()}</div>
        <div className={`plant ${type}`}>
          <div className="div1">{availableCapacity} MW</div>

          <div className="div2">
            {type === 'FullyDown' && (
              <FullyDown fill="#810909" width={19} height={19} />
            )}
            {type === 'PartiallyDown' && (
              <Warning fill="#810909" width={19} height={19} />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Slice;
