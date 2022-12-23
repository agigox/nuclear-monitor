import React,{ useEffect, useState } from 'react';
import { Spin, Row, Col } from 'antd';
import {
  loadAllProductions,
} from '../store/productions';
import { getCurrentDate } from '../store/otherSelectors';
import buildLoader from '../HOC/buildLoader';
// const { Row, Col } = DatePicker;
import { connect } from 'react-redux';



import {getProductions, getReactors} from "../api"




function OverviewComponent() {
  const [productions, setProductions] = useState([]);
  const [rctors, setReactors] = useState([]);

  useEffect(() => {
    getProductions({date: "2022-12-12"})
      .then(data => {
        setProductions([...data.productions])
      }
    )
    getReactors()
      .then(reactors => {
        console.log(reactors)
        setProductions([...reactors])
      }
    )
  }, [])

  return(
    <Row>
      {productions.length <= 0 ? <div className='spinner'><Spin size="large" /></div> : <div>
      <Col span={8}>
        <div>
          <Row>
            <Col className="box" span={24}>Etat du parc nucléaire français</Col>
            <Col className="box" span={24}>Informations relatives au volume d’électricité produit</Col>
          </Row>
        </div>
      </Col>
      <Col span={16}>
        <div className="box">
          <ul>{productions.map(item => <li key={item.identifier}>{item.identifier}</li>)}</ul>
        </div>
      </Col>
      </div>}
    </Row>
  )
}

export default OverviewComponent;
