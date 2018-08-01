import React from 'react'
import {
  Col, Row
} from 'reactstrap'
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

import './styles.css'

const Home = () => {
  return (
    <div className="Home">
      <Row>
        <Col sm="2" className="Section"></Col>
        <Col sm="7" className="Section"></Col>
        <Col sm="2" className="Section"></Col>
      </Row>
    </div>
  )
}

// export default withRouter(connect(mapStateToProps, {})(Home))
export default Home