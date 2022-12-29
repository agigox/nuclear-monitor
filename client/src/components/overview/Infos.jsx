import React from 'react';
import styled from '@emotion/styled';
import { Col } from 'antd';
import { useSelector } from 'react-redux';
import Indicator from './Indicator';
import Total from './Total';
import Title from './Title';
import PlannedDown from '../../images/planned_down.svg';
import Up from '../../images/up.svg';
import ForcedDown from '../../images/forced_down.svg';
import Rectangle1 from '../../images/Rectangle1.svg';
import Rectangle2 from '../../images/Rectangle2.svg';
import Rectangle3 from '../../images/Rectangle3.svg';

const StyledCol = styled(Col)`
  background: #ffffff;
  border: 1px solid #cfcfcf;
  box-shadow: 0px 4px 20px rgba(44, 22, 132, 0.2);
  border-radius: 10px;
  padding: 26px;
  margin-bottom: 20px;
`;

export default function Infos({ type }) {
  const {
    available,
    unavailable: { planned, forced },
    totalNumber,
    totalPower,
    unavailablePower,
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
          icon={PlannedDown}
          text="Réacteurs en arrêt pour maintenance"
          indicator={planned}
        />
        <Indicator
          icon={ForcedDown}
          text="Réacteurs en arrêt imprévu"
          indicator={forced}
        />
        <Total total={totalNumber} text="Réacteurs total" />
      </StyledCol>
    );
  }
  return (
    <StyledCol span={24}>
      <Title title="Informations relatives au volume d’électricité produit en GW" />
      <Indicator
        icon={Rectangle1}
        text="Production nucléaire totale"
        indicator={(totalPower / 1000).toFixed(1)}
      />
      <Indicator
        icon={Rectangle2}
        text="Activable"
        indicator={((totalPower - unavailablePower) / 1000).toFixed(1)}
      />
      <Indicator
        icon={Rectangle3}
        text="Indisponible"
        indicator={(unavailablePower / 1000).toFixed(1)}
      />
      <Total
        total={`${Math.round(
          (100 * (totalPower - unavailablePower)) / totalPower,
        )}%`}
        text="Puissance total"
      />
    </StyledCol>
  );
}
