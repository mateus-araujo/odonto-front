import React, { Component } from 'react'
import { Col, Form, FormGroup, Label, Input, Table } from 'reactstrap'
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa'
import { connect } from 'react-redux'
import { openCreateEmployee } from '../../../../store/actions'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class ManageEmployees extends Component {
  state = {
    funcionarios: [],
    message: '',
    loading: false,
    modalDelete: false,
    modalEdit: false,
    modalError: false,
    modalSuccess: false,
    idFuncionario: 0,
    nome: '',
    salario: '',
    descricao: ''
  }

  async editfuncionario() {
    const { nome, salario, descricao, idFuncionario } = this.state

    this.setState({ loading: true })

    await api.put(`/funcionarios/${idFuncionario}`, {
      nome,
      salario,
      descricao
    })
      .then(() => {
        this.setState({ modalSuccess: true, message: "Funcionario editado com sucesso" })
        this.updateFuncionarios()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loading: false })
  }

  async deletefuncionario() {
    const { idFuncionario } = this.state

    await api.delete(`/funcionarios/${idFuncionario}`)
      .then(() => {
        this.setState({ modalDelete: false })
        this.updateFuncionarios()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })
  }

  async updateFuncionarios() {
    this.setState({ loading: true })

    await api.get('/funcionarios')
      .then(response => {
        const { funcionarios } = response.data

        console.log(funcionarios)
        this.setState({ funcionarios })
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
    this.updateFuncionarios()
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <Loader />
          :
          <div>
            {this.state.funcionarios.length ?
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th className="Col-Medium">Nome</th>
                    <th className="Col-Large">Email</th>
                    <th>Função</th>
                    <th>Clinica</th>
                    <th className="Col-Icon"></th>
                    <th className="Col-Icon"></th>
                  </tr>
                </thead>

                <tbody className="Scrollable-Table">
                  {this.state.funcionarios.map(funcionario =>
                    <tr key={funcionario.id}>
                      <td className="Col-Medium">{funcionario.nome}</td>
                      <td className="Col-Large">{funcionario.User.email}</td>
                      <td>{funcionario.cargos.map(cargo => <div>{cargo.nome}</div>)}</td>
                      <td>{funcionario.clinica}</td>
                      <td className="Col-Icon">
                        <FaPencilAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({ modalEdit: true, idFuncionario: funcionario.id, ...funcionario })}
                          color="orange"
                        />
                      </td>
                      <td className="Col-Icon">
                        <FaTrashAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({ modalDelete: true, idFuncionario: funcionario.id })}
                          color="red"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              : <h3 style={{ margin: 10 }}>Não há nenhum funcionario cadastrado</h3>
            }
          </div>
        }

        <div className="Create-Button" onClick={() => this.props.openCreateEmployee()}>
          Cadastrar{' '}
          <FaPlusCircle color="green" size="1.8em" />
        </div>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deletefuncionario.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          message="Deseja mesmo excluir o funcionário?"
          modalTitle="Remover funcionário"
          primaryTitle="Sim"
          secondaryTitle="Não"
        />

        <CommonModal
          isOpen={this.state.modalError}
          toggle={this.toggleModalError.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Erro ao remover funcionário"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalSuccess}
          toggle={this.toggleModalSuccess.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Editar funcionário"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalEdit}
          toggle={this.toggleModalEdit.bind(this)}
          togglePrimary={this.editfuncionario.bind(this)}
          toggleSecondary={this.toggleModalEdit.bind(this)}
          centered
          modalTitle="Editar funcionário"
          primaryTitle="Salvar"
          secondaryTitle="Cancelar"
        >
          <Form style={{ marginTop: 30 }}>
            <FormGroup row>
              <Label sm="2">funcionario</Label>
              <Col sm="6">
                <Input
                  placeholder="Digite o funcionario"
                  onChange={e => this.setState({ nome: e.target.value })}
                  value={this.state.nome}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">Salário</Label>
              <Col sm="6">
                <Input
                  placeholder="Digite o salário do funcionario"
                  onChange={e => this.setState({ salario: e.target.value })}
                  value={this.state.salario}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm="2">Descrição</Label>
              <Col sm="6">
                <Input
                  placeholder="Digite a descrição do funcionario"
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

export default connect(null, { openCreateEmployee })(ManageEmployees)
