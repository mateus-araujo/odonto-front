import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Options from './Options'
import Main from './Main'
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

import './styles.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Row>
          <Col sm={{ size: 7, offset: 2 }}>
            <h3>{this.props.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col sm="2" className="Section">
            <Options />
          </Col>
          <Col sm="7" className="Section">
            <Main />
          </Col>
          <Col sm="2" className="Section">
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ home }) => {
  const { title } = home

  return { title }
}

export default withRouter(connect(mapStateToProps, { })(Home))