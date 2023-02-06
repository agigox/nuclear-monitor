/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import ArrowUp from '../../../../images/arrow_upward.svg';

const StyledRow = styled(Row)`
  height: 86px;
  width: 1440px;
  background: #22323a;
`;
function GoTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);
  return (
    <StyledRow className="go-to-top">
      <Col flex="31">
        <img src={ArrowUp} alt="" />
      </Col>
      <Col className="go-top-text" flex="auto">
        Retour en haut de page
      </Col>
      {/* <Button>
     <FaArrowCircleUp onClick={scrollToTop} 
     style={{display: visible ? 'inline' : 'none'}} />
    </Button> */}
    </StyledRow>
  );
}

export default GoTop;
