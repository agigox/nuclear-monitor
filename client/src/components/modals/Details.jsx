/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from '@emotion/styled';
import { Col, Divider, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Close from '../../images/close.svg';
import Up from '../../images/up.svg';
import appActions from '../../redux/actions';
import DetailsItem from './DetailsItem';
import ReactorSlider from './ReactorSlider';

const CustomRow = styled(Row)`
  padding: 20px;
  background: #ffffff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 8px;
  position: fixed;
  right: 62px;
  bottom: 10px;
  z-index: 999;
  .title {
    font-size: 24px;
    line-height: 32px;
    color: #000000;
  }
  .date {
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #009cdf;
    text-align: right;
  }
  .close {
    text-align: right;
    img {
      cursor: pointer;
    }
  }
  .divider {
    height: calc(100% - 10px);
    margin-top: 5px;
  }
  .text-1 {
    font-family: 'Nunito Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #cdcdcd;
    text-transform: uppercase;
  }
  .text-2-1 {
    margin-left: 16px;
    position: relative;
    top: 7px;
  }

  .row-tr {
    height: 36px;
  }
  @media only screen and (min-width: 992px) {
    width: 958px;
  }
  @media only screen and (max-width: 767px) {
    width: calc(100% - 129px);
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
    <CustomRow className="modal" gutter={[0, 25]}>
      <Col span={24}>
        <Row align="top">
          <Col className="title" flex="210px">
            {name}
          </Col>
          <Col>
            <ReactorSlider name={name} />
          </Col>
          <Col className="date" flex="auto">
            Mise à jour le{' '}
            {`${moment(updatedDate).format('MM/DD/YYYY HH:mm:ss')} (CET)`}
          </Col>
          <Col className="close" flex="45px">
            <img src={Close} alt="close" onClick={resetCurrent} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        {unavailableCapacity !== 0 && (
          <Row wrap={false}>
            <Col flex="1 1 25%">
              <Row wrap={false}>
                <Col>
                  <Row gutter={[0, 32]}>
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
                  <Row gutter={[0, 32]}>
                    <Col span={24}>
                      <DetailsItem
                        text="Capacité restant disponible"
                        value={`${availableCapacity} MW`}
                      />
                    </Col>
                    <Col span={24}>
                      <DetailsItem
                        text="Capacité non disponible"
                        value={`${unavailableCapacity} MW`}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Divider className="divider" type="vertical" />
                </Col>
              </Row>
            </Col>
            <Col flex="1 1 50%">
              <DetailsItem text="Informations complémentaires" value={reason} />
            </Col>
          </Row>
        )}
        {unavailableCapacity === 0 && (
          <Row gap={[15, 0]}>
            <Col span={24} className="text-1">
              PAS D’INDISPONIBILIté
            </Col>
            <Col span={24} className="text-2">
              <Row className="row-tr">
                <Col>
                  <img src={Up} alt="up" />
                </Col>
                <Col className="text-2-1">Réacteurs en fonctionnement</Col>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </CustomRow>
  );
}

export default Details;
