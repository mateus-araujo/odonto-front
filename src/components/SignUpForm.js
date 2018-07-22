import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Row } from 'reactstrap';

class SignUpForm extends Component {
  render() {
    return (
      <div class="Login-form">
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Digite seu email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="usuario@email.com" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Digite sua senha</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="sua senha" />
          </FormGroup>
          <FormGroup row style={{ marginTop: 60 }}>
            <Col sm={8}>
              <Button color="link">Esqueceu a senha?</Button>
            </Col>
            <Col sm={4}>
              <Button>Entrar</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;