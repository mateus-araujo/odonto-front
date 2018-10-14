import React, { Component } from 'react'
import { Col, Form, FormFeedback, FormGroup, Label, Input, Table } from 'reactstrap'
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa'
import _ from 'lodash'
import validator from 'validator'
import { connect } from 'react-redux'

import { openCreateRole } from '../../../../store/actions'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class ManageRoles extends Component {
  state = {
    cargos: [],
    message: '',
    loading: true,
    loadingModal: false,
    modalDelete: false,
    modalEdit: false,
    modalError: false,
    modalSuccess: false,
    idCargo: 0,
    nome: '',
    nomeError: '',
    salario: '',
    salarioError: '',
    descricao: '',
    descricaoError: ''
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
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

  async editCargo() {
    const error = this.validate()

    if (!error) {
      this.setState({ loadingModal: true })

      const { nome, salario, descricao, idCargo } = this.state

      await api.put(`/cargos/${idCargo}`, {
        nome,
        salario,
        descricao
      })
        .then(() => {
          this.setState({ modalSuccess: true, message: "Cargo editado com sucesso" })
          this.updateCargos()
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modalError: true, message: error })
        })

      this.setState({ loadingModal: false })
    }
  }

  async deleteCargo() {
    this.setState({ loadingModal: true })

    const { idCargo } = this.state

    await api.delete(`/cargos/${idCargo}`)
      .then(() => {
        this.setState({ modalDelete: false })
        this.updateCargos()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loadingModal: false })
  }

  async updateCargos() {
    this.setState({ loading: true })

    await api.get('/cargos')
      .then(response => {
        const { cargos } = response.data

        this.setState({ cargos })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })

    this.setState({ loading: false })
  }

  toggleModalEdit() {
    this.setState({ modalEdit: false })
  }

  toggleModalDelete() {
    this.setState({ modalDelete: false })
  }

  toggleModalError() {
    this.setState({ modalError: false, modalDelete: false })
  }

  toggleModalSuccess() {
    this.setState({ modalSuccess: false, modalEdit: false })
  }

  componentDidMount() {
    this.updateCargos()
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          <div style={{ fontSize: 14 }}>
            {this.state.cargos.length ?
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th>Cargo</th>
                    <th>Salário</th>
                    <th>Descrição</th>
                    <th className="Col-Icon"></th>
                    <th className="Col-Icon"></th>
                  </tr>
                </thead>

                <tbody className="Scrollable-Table">
                  {this.state.cargos.map(cargo =>
                    <tr key={cargo.id}>
                      <td>{cargo.nome}</td>
                      <td>R$ {cargo.salario}</td>
                      <td>{cargo.descricao}</td>
                      <td className="Col-Icon">
                        <FaPencilAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({ modalEdit: true, idCargo: cargo.id, ...cargo })}
                          color="orange"
                        />
                      </td>
                      <td className="Col-Icon">
                        <FaTrashAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({ modalDelete: true, idCargo: cargo.id })}
                          color="red"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              : <h3 style={{ margin: 10 }}>Não há nenhum cargo cadastrado</h3>
            }
          </div>
        }

        {!this.state.loading ?
          <div className="Create-Button" onClick={() => this.props.openCreateRole()}>
            Cadastrar{' '}
            <FaPlusCircle color="green" size="1.8em" />
          </div>
          : null
        }

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deleteCargo.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          modalTitle="Remover cargo"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo excluir o cargo?
        
            {this.state.loadingModal ?
              <div className="Loading">
                <Loader />
              </div>
              : null
            }
          </div>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalError}
          toggle={this.toggleModalError.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Erro ao remover cargo"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalSuccess}
          toggle={this.toggleModalSuccess.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Editar cargo"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalEdit}
          toggle={this.toggleModalEdit.bind(this)}
          togglePrimary={this.editCargo.bind(this)}
          toggleSecondary={this.toggleModalEdit.bind(this)}
          centered
          modalTitle="Editar cargo"
          primaryTitle="Salvar"
          secondaryTitle="Cancelar"
        >
          <Form style={{ marginTop: 30 }}>
            <FormGroup row>
              <Label sm="2" size="sm">Cargo</Label>
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
              <Label sm="2" size="sm">Salário</Label>
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
              <Label sm="2" size="sm">Descrição</Label>
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

            <FormGroup>
              {this.state.loadingModal ?
                <div className="Loading">
                  <Loader />
                </div>
                : null
              }
            </FormGroup>
          </Form>
        </CommonModal>
      </div >
    )
  }
}

export default connect(null, { openCreateRole })(ManageRoles)
