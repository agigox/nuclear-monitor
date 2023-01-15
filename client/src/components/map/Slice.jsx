/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appActions from '../../redux/actions';
import Details from '../modals/Details';
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
    
  }
  .active {
    height: 56px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    opacity: 0.9;
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
    top: 2px;
    font-style: italic;
    color
  }
  .div4 {
    display: flex;
  }
  .div3 {
    align-self: center;
  }
  .cursor {
    cursor: pointer;
  }
`;
function Slice(props) {
  const {
    availability: { name, installedCapacity, availableCapacity },
  } = props;
  const dispatch = useDispatch();
  const changeCurrent = () => {
    if (availableCapacity === 0 || availableCapacity < installedCapacity) {
      dispatch(appActions.crossActions.changeCurrent(props.availability));
    }
  };
  const open = useSelector((state) => state.cross.current);
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
        <div
          className={`plant ${type} ${
            type === 'FullyDown' || type === 'PartiallyDown' ? 'cursor' : ''
          } ${open && open.name === name ? 'active' : ''}`}
          onClick={() => changeCurrent()}
          onKeyPress={() => changeCurrent()}
          role="button"
          tabIndex="0"
        >
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
      <Details />
    </Wrapper>
  );
}

export default Slice;
