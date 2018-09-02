import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

import api from '../../../../services/api'

class CreateRole extends Component {
  constructor(props){
    super(props)
    this.baseState = this.state 
  }
  
  state = {
    nome: '',
    salario: '',
    descricao: '',
    loading: false,
    message: '',
    modal: false
  }

  toggleModal() {
    this.setState(this.baseState)
  }

  createRole = async () => {
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
          this.setState({ modal: true, message: error  })
        else
          this.setState({ modal: true, message: "Erro ao inserir cargo, tente novamente" })
      })
  }

  render() {
    return (
      <div className="CreateRole">
        <Form style={{ marginTop: 30 }}>
          <FormGroup row>
            <Label sm="2">Cargo</Label>
            <Col sm="6">
              <Input
                placeholder="Digite o cargo"
                onChange={e => this.setState({ nome: e.target.value })}
                value={this.state.nome}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="2">Salário</Label>
            <Col sm="6">
              <Input
                placeholder="Digite o salário do cargo"
                onChange={e => this.setState({ salario: e.target.value })}
                value={this.state.salario}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="2">Descrição</Label>
            <Col sm="6">
              <Input
                placeholder="Digite a descrição do cargo"
                onChange={e => this.setState({ descricao: e.target.value })}
                value={this.state.descricao}
              />
            </Col>
          </FormGroup>

          <FormGroup row style={{ marginTop: 50 }}>
            <Col sm="6"></Col>
            <Col xs="4" sm="4">
              <Button
                color="primary"
                style={{ inlineSize: 100 }}
                onClick={() => this.createRole()}
              >
                {this.state.loading ? 
                  <Loader />
                : <div>Adicionar</div> }
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
