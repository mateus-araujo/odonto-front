import React, { Component } from 'react'
import {
  Col, Button, CustomInput, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Form, FormFeedback, FormGroup, Label, Input
} from 'reactstrap'
import InputMask from 'react-input-mask'
import validator from 'validator'
import classNames from 'classnames/bind'

import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class CreateEmployee extends Component {
  constructor(props) {
    super(props)
    this.baseState = this.state
  }

  state = {
    cargos: [],
    nome: '',
    nomeError: '',
    cpf: '',
    cpfError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    data_nascimento: '',
    data_nascimentoError: '',
    selectedCargo: [],
    cargoError: '',
    clinica: '',
    clinicaError: '',
    acesso_sistema: false,
    loading: false,
    message: '',
    error: '',
    isError: false,
    modal: false,
    dropdown: false,
  }

  toggleModal() {
    this.setState(this.baseState)
    this.getCargos()
  }

  toggleDropdown() {
    this.setState({ dropdown: !this.state.dropdown })
  }

  getCargos = async () => {
    this.setState({ loading: true })

    await api.get('/cargos')
      .then(response => {
        const { cargos } = response.data

        this.setState({ cargos, selectedCargo: cargos[0] })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })

    this.setState({ loading: false })
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.nome)) {
      isError = true
      this.setState({ nomeError: "Nome não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.cpf)) {
      isError = true
      this.setState({ cpfError: "Cpf não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.data_nascimento)) {
      isError = true
      this.setState({ data_nascimentoError: "Data de nascimento não pode estar vazia" })
    }

    if (validator.isEmpty(this.state.email)) {
      isError = true
      this.setState({ emailError: "Email não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.password)) {
      isError = true
      this.setState({ passwordError: "Senha não pode estar vazia" })
    }

    if (validator.isEmpty(this.state.clinica)) {
      isError = true
      this.setState({ clinicaError: "Clínica não pode estar vazia" })
    }

    return isError
  }

  createEmployee = async () => {
    const error = this.validate()

    if (!error) {
      this.setState({ loading: true })

      const { nome, cpf, email, password, data_nascimento, selectedCargo, clinica, acesso_sistema } = this.state
      const cargos = []
      cargos.push(selectedCargo.id)

      await api.post('/funcionarios', {
        nome,
        cpf,
        email,
        password,
        data_nascimento,
        cargos,
        clinica,
        acesso_sistema
      })
        .then(() => {
          this.setState({ modal: true, message: "Funcionário inserido com sucesso" })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          if (error)
            this.setState({ modal: true, message: error })
        })
    }
  }

  componentDidMount() {
    this.getCargos()
  }

  render() {
    const FormControlCpf = classNames({
      'form-control': true,
      'form-control-sm': true,
      'is-invalid': this.state.cpfError
    })

    const FormControlData = classNames({
      'form-control': true,
      'form-control-sm': true,
      'is-invalid': this.state.data_nascimentoError
    })

    return (
      <div className="CreateEmployee">
        <Form style={{ marginTop: 10 }}>
          <FormGroup row>
            <Label sm="1" size="sm">Nome</Label>
            <Col sm="5">
              <Input
                invalid={this.state.nomeError}
                bsSize="sm"
                placeholder="Digite o nome do funcionário"
                onChange={e => this.setState({ nome: e.target.value, nomeError: '' })}
                value={this.state.nome}
              />
              <FormFeedback>{this.state.nomeError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="1" size="sm">CPF</Label>
            <Col sm="4">
              <InputMask
                required
                className={FormControlCpf}
                mask="999.999.999-99"
                bsSize="sm"
                placeholder="Digite o cpf do funcionário"
                onChange={e => this.setState({ cpf: e.target.value, cpfError: '' })}
                value={this.state.cpf}
              />
              <div class="invalid-feedback">{this.state.cpfError}</div>
            </Col>

            <Label sm="2" size="sm">Data de nasc.</Label>
            <Col sm="5">
              <InputMask
                className={FormControlData}
                mask="99/99/9999"
                placeholder="Digite a data de nascimento do funcionário"
                onChange={e => this.setState({ data_nascimento: e.target.value, data_nascimentoError: '' })}
                value={this.state.data_nascimento}
              />
              <div class="invalid-feedback">
                {this.state.data_nascimentoError}
              </div>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="1" size="sm">Email</Label>
            <Col sm="4">
              <Input
                invalid={this.state.emailError}
                bsSize="sm"
                type="email"
                placeholder="Digite o email do funcionário"
                onChange={e => this.setState({ email: e.target.value, emailError: '' })}
                value={this.state.email}
              />
              <FormFeedback>{this.state.emailError}</FormFeedback>
            </Col>

            <Label sm="1" size="sm">Senha</Label>
            <Col sm="5">
              <Input
                invalid={this.state.passwordError}
                bsSize="sm"
                type="password"
                placeholder="Digite o senha do funcionário"
                onChange={e => this.setState({ password: e.target.value, passwordError: '' })}
                value={this.state.password}
              />
              <FormFeedback>{this.state.passwordError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="1" size="sm">Cargo</Label>
            <Col sm="4">
              <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown.bind(this)} size="sm">
                <DropdownToggle caret style={{ inlineSize: 150 }}>
                  {this.state.selectedCargo.nome}
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.cargos.map(cargo =>
                    <DropdownItem
                      onClick={() => this.setState({ selectedCargo: cargo })}
                    >
                      {cargo.nome}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </Col>

            <Label sm="1" size="sm">Clínica</Label>
            <Col sm="5">
              <Input
                invalid={this.state.clinicaError}
                bsSize="sm"
                placeholder="Digite o clínica do funcionário"
                onChange={e => this.setState({ clinica: e.target.value, clinicaError: '' })}
                value={this.state.clinica}
              />
              <FormFeedback>{this.state.clinicaError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm="6" style={{ fontSize: 14 }}>
              <CustomInput
                checked={this.state.acesso_sistema}
                onChange={e => this.setState({ acesso_sistema: e.target.checked })}
                type="checkbox" id="acesso_sistema" label="Acesso ao sistema"
              />
            </Col>
          </FormGroup>

          <FormGroup row style={{ marginTop: 10 }}>
            <Col sm="6"></Col>
            <Col xs="4" sm="4">
              <Button
                size="sm"
                color="primary"
                style={{ inlineSize: 100 }}
                onClick={() => this.createEmployee()}
              >
                {this.state.loading ?
                  <Loader color="#FFF" />
                  : <div>Adicionar</div>}
              </Button>
            </Col>
          </FormGroup>
        </Form>

        <CommonModal
          isOpen={this.state.modal}
          toggle={this.toggleModal.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Criar funcionario"
          primaryTitle="Ok"
        />
      </div>
    )
  }
}

export default CreateEmployee
