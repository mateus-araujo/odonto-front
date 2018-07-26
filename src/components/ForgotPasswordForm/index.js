import React, { Component } from 'react'
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { emailChanged, forgotPassword } from '../../store/actions'

import './styles.css'

class ForgotPasswordForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onButtonPress() {
    const { email } = this.props

    this.props.forgotPassword({ email })
  }

  render() {
    return (
      <div className="Forgot-password-form">
        <h3>Recuperação de senha</h3>
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
                <Button color="secondary">Voltar</Button>
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
  emailChanged, forgotPassword
})(ForgotPasswordForm)