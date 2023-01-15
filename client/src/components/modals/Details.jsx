/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from '@emotion/styled';
import { Col, Divider, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../images/close.svg';
import appActions from '../../redux/actions';
import DetailsItem from './DetailsItem';

const CustomRow = styled(Row)`
  padding: 20px;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;
  border-radius: 8px;
  position: fixed;
  right: 21px;
  bottom: 0;
  z-index: 999;
  width: calc(50% - 42px);
  .title {
    font-size: 24px;
    line-height: 32px;
    color: #000000;
  }
  .date {
    ont-family: 'Nunito Sans';
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #009cdf;
    text-align: right;
  }
  .close {
    text-align: right;
  }
  @media only screen and (min-width: 992px) {
    width: calc(75% - 42px);
  }
  @media only screen and (max-width: 767px) {
    width: calc(100% - 42px);
  }
`;

function Details() {
  const current = useSelector((state) => state.cross.current);

  if (!current) {
    return null;
  }
  const {
    name,
    reason,
    updatedDate,
    startDate,
    endDate,
    availableCapacity,
    unavailableCapacity,
  } = current;
  const dispatch = useDispatch();
  const resetCurrent = () => {
    dispatch(appActions.crossActions.resetCurrent());
  };
  return (
    <CustomRow className="modal">
      <Col span={24}>
        <Row align="top">
          <Col className="title" flex="170px">
            {name}
          </Col>
          <Col className="date" flex="auto">
            Mise à jour le{' '}
            {`${moment(updatedDate).format('MM/DD/YYYY HH:mm:ss')} (CET)`}
          </Col>
          <Col className="close" flex="30px">
            <img src={Close} alt="close" onClick={resetCurrent} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row wrap={false}>
          <Col flex="1 1 25%">
            <Row wrap={false}>
              <Col>
                <Row gutter={[0, 48]}>
                  <Col span={24}>
                    <DetailsItem
                      text="Début de l’indisponibilité"
                      value={moment(startDate).format('MM/DD/YYYY')}
                    />
                  </Col>
                  <Col span={24}>
                    <DetailsItem
                      text="Fin de l’indisponibilité"
                      value={moment(endDate).format('MM/DD/YYYY')}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Divider className="divider" type="vertical" />
              </Col>
            </Row>
          </Col>
          <Col flex="1 1 25%">
            <Row wrap={false}>
              <Col>
                <Row gutter={[0, 48]}>
                  <Col span={24}>
                    <DetailsItem
                      text="Capacité restant disponible"
                      value={availableCapacity}
                    />
                  </Col>
                  <Col span={24}>
                    <DetailsItem
                      text="Capacité non disponible"
                      value={unavailableCapacity}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <Divider type="vertical" />
              </Col>
            </Row>
          </Col>
          <Col flex="1 1 50%">
            <DetailsItem text="Informations complémentaires" value={reason} />
          </Col>
        </Row>
      </Col>
    </CustomRow>
  );
}

export default Details;
