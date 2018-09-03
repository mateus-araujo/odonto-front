import React, { Component } from 'react'
import { Col, Button, Form, FormFeedback, FormGroup, Label, Input } from 'reactstrap'
import validator from 'validator'

import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class CreateRole extends Component {
  constructor(props) {
    super(props)
    this.baseState = this.state
  }

  state = {
    nome: '',
    nomeError: '',
    salario: '',
    salarioError: '',
    descricao: '',
    descricaoError: '',
    loading: false,
    message: '',
    modal: false
  }

  toggleModal() {
    this.setState(this.baseState)
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.nome)) {
      isError = true
      this.setState({ nomeError: "Nome não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.salario.toString())) {
      isError = true
      this.setState({ salarioError: "Salário não pode estar vazio" })
    }

    if (!validator.isFloat(this.state.salario.toString())) {
      isError = true
      this.setState({ salarioError: "Salário deve ser um valor numérico" })
    }

    if (validator.isEmpty(this.state.descricao)) {
      isError = true
      this.setState({ descricaoError: "Descrição não pode estar vazia" })
    }

    return isError
  }

  createRole = async () => {
    const error = this.validate()

    if (!error) {
      this.setState({ loading: true })

      const { nome, salario, descricao } = this.state

      await api.post('/cargos', {
        nome,
        salario,
        descricao
      })
        .then(() => {
          this.setState({ modal: true, message: "Cargo inserido com sucesso" })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          if (error === "Cargo já existe")
            this.setState({ modal: true, message: error })
          else
            this.setState({ modal: true, message: "Erro ao inserir cargo, tente novamente" })
        })
    }
  }

  render() {
    return (
      <div className="CreateRole">
        <Form style={{ marginTop: 30 }}>
          <FormGroup row>
            <Label sm="1" size="sm">Cargo</Label>
            <Col sm="6">
              <Input
                invalid={this.state.nomeError}
                bsSize="sm"
                placeholder="Digite o nome do cargo"
                onChange={e => this.setState({ nome: e.target.value, nomeError: '' })}
                value={this.state.nome}
              />
              <FormFeedback>{this.state.nomeError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="1" size="sm">Salário</Label>
            <Col sm="6">
              <Input
                invalid={this.state.salarioError}
                bsSize="sm"
                placeholder="Digite o salário do cargo"
                onChange={e => this.setState({ salario: e.target.value, salarioError: '' })}
                value={this.state.salario}
              />
              <FormFeedback>{this.state.salarioError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="1" size="sm">Descrição</Label>
            <Col sm="6">
              <Input
                invalid={this.state.descricaoError}
                bsSize="sm"
                placeholder="Digite a descrição do cargo"
                onChange={e => this.setState({ descricao: e.target.value, descricaoError: '' })}
                value={this.state.descricao}
              />
              <FormFeedback>{this.state.descricaoError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row style={{ marginTop: 50 }}>
            <Col sm="5"></Col>
            <Col xs="4" sm="4">
              <Button
                size="sm"
                color="primary"
                style={{ inlineSize: 100 }}
                onClick={() => this.createRole()}
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
          modalTitle="Criar cargo"
          primaryTitle="Ok"
        />
      </div>
    )
  }
}

export default CreateRole
