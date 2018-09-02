import React, { Component } from 'react'
import { Col, Form, FormGroup, Label, Input, Table } from 'reactstrap'
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa'
import { connect } from 'react-redux'
import { openCreateRole } from '../../../../store/actions'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class ManageRoles extends Component {
  state = {
    cargos: [],
    message: '',
    loading: false,
    modalDelete: false,
    modalEdit: false,
    modalError: false,
    modalSuccess: false,
    idCargo: 0,
    nome: '',
    salario: '',
    descricao: ''
  }

  async editCargo() {
    const { nome, salario, descricao, idCargo } = this.state

    this.setState({ loading: true })

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

    this.setState({ loading: false })
  }

  async deleteCargo() {
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
    this.setState({ modalError: false })
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
          <Loader />
          :
          <div>
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

        <div className="Create-Button" onClick={() => this.props.openCreateRole()}>
          Cadastrar{' '}
          <FaPlusCircle color="green" size="1.8em" />
        </div>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deleteCargo.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          message="Deseja mesmo excluir o cargo?"
          modalTitle="Remover cargo"
          primaryTitle="Sim"
          secondaryTitle="Não"
        />

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
          </Form>
        </CommonModal>
      </div>
    )
  }
}

export default connect(null, { openCreateRole })(ManageRoles)
