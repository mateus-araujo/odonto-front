import React, { Component } from 'react'
import {
  Alert, Col, Button, Form, FormGroup, Label, Input
} from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loader from '../Loader'
import CommonModal from '../CommonModal'
import { emailChanged, forgotPassword, userClean } from '../../store/actions'

import './styles.css'

class ForgotPasswordForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onButtonPress() {
    const { email } = this.props

    this.props.forgotPassword({ email })
  }

  toggleModal() {
    this.props.userClean()

    this.props.history.push('/login')
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
            {this.props.loading ? (
              <Loader />
            ) : null}

            {this.props.hasError ? (
              <Alert color="danger">
                {this.props.error}
              </Alert>
            ) : null}
          </FormGroup>

          <FormGroup row style={{ marginTop: 30 }}>
            <Col xs="7" sm="7"></Col>

            <Col xs="2" sm="2" style={{ marginRight: 10 }}>
              <Link to="/">
                <Button color="secondary">Voltar</Button>
              </Link>
            </Col>

            <Col xs="2" sm="2">
              <Button
                onClick={this.onButtonPress.bind(this)}
                color="primary"
              >
                Enviar
              </Button>
            </Col>
          </FormGroup>
        </Form>
        
        <CommonModal 
          isOpen={this.props.hasMessage}
          toggle={this.toggleModal.bind(this)}
          centered
          message={this.props.message}
          modalTitle="Recuperação de senha requisitada"
          primaryTitle="Ok"
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, hasError, error, hasMessage, message, loading } = auth

  return { email, password, hasError, error, hasMessage, message, loading }
}

export default withRouter(connect(mapStateToProps, {
  emailChanged, forgotPassword, userClean
})(ForgotPasswordForm))