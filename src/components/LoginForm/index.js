import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import './styles.css';

class LoginForm extends Component {
  render() {
    return (
      <div className="Login-form">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Digite seu email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="usuario@email.com" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Digite sua senha</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="sua senha" />
          </FormGroup>
          <FormGroup row style={{ marginTop: 50 }}>
            <Col xs="8" sm={8}>
              <Button color="link">Esqueceu a senha?</Button>
            </Col>
            <Col xs="4" sm={4}>
              <Link to="/app">
                <Button color="primary">Entrar</Button>
              </Link>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default LoginForm;