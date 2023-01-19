import React from 'react';
import styled from '@emotion/styled';
import { Col } from 'antd';
import { useSelector } from 'react-redux';
import Indicator from './Indicator';
import Total from './Total';
import Title from './Title';
import FullyDown from '../../images/fully_down.svg';
import Up from '../../images/up.svg';
import PariallyDown from '../../images/partially_down.svg';

const StyledCol = styled(Col)`
  background: #ffffff;
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 20px rgba(44, 22, 132, 0.2);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  @media only screen and (max-width: 767px) {
    padding: 10px;
    padding-bottom: 20px;
    border-radius: 5px;
    box-shadow: none;
    &.dateCol {
      box-shadow: none;
      border: 0;
      margin-bottom: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export default function Infos({ type }) {
  const {
    available,
    unavailable: { partiallyDown, fullyDown },
    totalNumber,
    totalPower,
    totalUnavailablePower,
  } = useSelector((state) => state.unavailabilities.overview);
  if (type === 'reactor') {
    return (
      <StyledCol span={24}>
        <Title title="Etat du parc nucléaire français" />
        <Indicator
          icon={Up}
          text="Réacteurs en fonctionnement"
          indicator={available}
        />
        <Indicator
          icon={PariallyDown}
          text="Réacteurs en arrêt partiel"
          indicator={partiallyDown}
        />
        <Indicator
          icon={FullyDown}
          text="Réacteurs en arrêt total"
          indicator={fullyDown}
        />
        <Total total={totalNumber} text="Nombre total de réacteurs français" />
      </StyledCol>
    );
  }
  return (
    <StyledCol span={24}>
      <Title title="Informations relatives au volume d’électricité produit" />
      <Indicator
        text="Production nucléaire totale"
        indicator={((totalPower - totalUnavailablePower) / 1000).toFixed(1)}
        type="power"
      />
      <Indicator
        text="Indisponible"
        indicator={(totalUnavailablePower / 1000).toFixed(1)}
        type="power"
      />
      <Total
        total={`${Math.round(
          (100 * (totalPower - totalUnavailablePower)) / totalPower,
        )}%`}
        text="Part de production du parc nucléaire"
        type="power"
      />
    </StyledCol>
  );
}
