import React, { Component } from 'react'
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, resetPassword } from '../../store/actions'

import './styles.css'

class ResetPasswordForm extends Component {
  state = {
    r_password: ''
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    const { email, token } = this.props.match.params
    const { password } = this.props
    const { r_password } = this.state;

    this.props.resetPassword({ email, password, r_password, token })
  }

  render() {
    return (
      <div className="Reset-password-form">
        <h3>Insira uma nova de senha</h3>
        <Form style={{ marginTop: 30 }}>
          <FormGroup>
            <Label for="examplePassword">Digite sua senha</Label>
            <Input
              type="password" id="examplePassword" placeholder="sua senha"
              onChange={e => this.onPasswordChange(e.target.value)}
              value={this.props.password}
            />
          </FormGroup>

          <FormGroup>
            <Label for="examplePassword2">Repita sua senha</Label>
            <Input
              type="password" id="examplePassword2" placeholder="repita sua senha"
              onChange={e => this.setState({ r_password: e.target.value })}
              value={this.state.r_password}
            />
          </FormGroup>

          <FormGroup>
            {this.props.error ? (
              <Alert color="danger">
                {this.props.error}
              </Alert>
            ) : null}
          </FormGroup>

          <FormGroup row style={{ marginTop: 30 }}>
            <Col xs="7" sm={7}></Col>
            <Col xs="2" sm={2} style={{ marginRight: 10 }}>
              <Link to="/">
                <Button color="secondary">
                  Voltar
                </Button>
              </Link>
            </Col>
            <Col xs="2" sm={2}>
              <Button
                onClick={this.onButtonPress.bind(this)}
                color="primary"
              >
                Enviar
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
  emailChanged, passwordChanged, resetPassword
})(ResetPasswordForm)