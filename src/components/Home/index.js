import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Options from './Options'
import Main from './Main'
import Management from './Management'
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

import './styles.css'

class Home extends Component {
  render() {
    const { permissao } = this.props.user.funcionario.cargos[0]

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

          <Col className="Section">
            <Main />
          </Col>

          {permissao !== "Usuário padrão" ?
            <Col sm="2" className="Section">
              <Management />
            </Col>
            : <Col sm="2"></Col>
          }
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state.auth
  const { title } = state.main

  return { user, title }
}

export default withRouter(connect(mapStateToProps, {})(Home))