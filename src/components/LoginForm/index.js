import React, { Component } from 'react'
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../Loader'
import { emailChanged, passwordChanged, loginUser } from '../../store/actions'

import './styles.css'

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    const { email, password } = this.props

    this.props.loginUser({ email, password })
  }

  render() {
    return (
      <div className="Login-form">
        <h3>Login</h3>
        <Form style={{ marginTop: 30 }}>
          <FormGroup>
            <Label for="exampleEmail">Digite seu email</Label>
            <Input
              type="email" id="exampleEmail" placeholder="usuario@email.com"
              onChange={e => this.onEmailChange(e.target.value)}
              value={this.props.email}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword">Digite sua senha</Label>
            <Input
              type="password" id="examplePassword" placeholder="sua senha"
              onChange={e => this.onPasswordChange(e.target.value)}
              value={this.props.password}
            />
          </FormGroup>

          <FormGroup>
            {this.props.loading ? (
              <div className="Loading">
                <Loader />
              </div>
            ) : null}

            {this.props.error.length > 0 ?
              <Alert color="danger">
                {this.props.error}
              </Alert>
              : null
            }
          </FormGroup>

          <FormGroup row style={{ marginTop: 50 }}>
            <Col xs="8" sm="8">
              <Link to="/forgot_password">
                <Button color="link">
                  Esqueceu a senha?
                </Button>
              </Link>
            </Col>

            <Col xs="4" sm="4">
              <Button
                onClick={this.onButtonPress.bind(this)}
                color="primary"
              >
                Entrar
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth

  return { email, password, error, loading }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm)