import React, { Component } from 'react'
import {
  Col, Form, FormFeedback, FormGroup, Label, Input, Table
} from 'reactstrap'
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import validator from 'validator'
import { connect } from 'react-redux'

import { openManageEmployees, openCreateGroup } from '../../../../store/actions'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class ManageGroups extends Component {
  state = {
    grupos: [],
    funcionarios: [],
    titulo: '',
    tituloError: '',
    fundadorId: '',
    integrantes: [],
    integrantesError: '',
    loading: true,
    message: '',
    error: '',
    modalDelete: false,
    modalEdit: false,
    modalError: false,
    modalSuccess: false,
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.titulo)) {
      isError = true
      this.setState({ tituloError: "Nome do grupo não pode estar vazio" })
    }

    if (!this.state.integrantes.length) {
      isError = true
      this.setState({ integrantes: "O grupo precisa ter integrantes" })
    }

    return isError
  }

  async editGrupo() {
    const error = this.validate()

    if (!error) {
      this.setState({ loading: true })

      const { titulo, fundadorId, idGrupo } = this.state

      let integrantes = this.state.integrantes
      integrantes = integrantes.map(integrante => integrante.id)

      await api.put(`/grupos/${idGrupo}`, {
        titulo,
        fundadorId,
        integrantes
      })
        .then(() => {
          this.setState({ modalSuccess: true, message: "Grupo editado com sucesso" })
          this.getGrupos()
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modalError: true, message: error })
        })
        .finally(() => {
          this.setState({ loading: false })
        })
    }
  }

  async deleteGrupo() {
    this.setState({ loading: true })

    const { idGrupo } = this.state

    await api.delete(`/grupos/${idGrupo}`)
      .then(() => {
        this.setState({ modalDelete: false })
        this.getGrupos()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  async getFuncionarios() {
    this.setState({ loading: true })

    await api.get('/funcionarios')
      .then(response => {
        const { funcionarios } = response.data

        this.setState({ funcionarios })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  async getGrupos() {
    this.setState({ loading: true })

    await api.get('/grupos')
      .then(response => {
        const { grupos } = response.data

        this.setState({ grupos })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
  }

  componentDidMount() {
    this.getFuncionarios()
    this.getGrupos()
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

  render() {
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          <div>
            {this.state.grupos.length ?
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Contatos</th>
                    <th className="Col-Icon"></th>
                    <th className="Col-Icon"></th>
                  </tr>
                </thead>

                <tbody className="Scrollable-Table">
                  {this.state.grupos.map(grupo =>
                    <tr key={grupo.id}>
                      <td>{grupo.titulo}</td>
                      <td>
                        {grupo.integrantes.map(integrante =>
                          <React.Fragment>
                            {integrante.name}{' / '}
                          </React.Fragment>
                        )}
                      </td>
                      <td className="Col-Icon">
                        <FaPencilAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({
                            modalEdit: true,
                            idGrupo: grupo.id,
                            ...grupo
                          })}
                          color="orange"
                        />
                      </td>
                      <td className="Col-Icon">
                        <FaTrashAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({ modalDelete: true, idGrupo: grupo.id })}
                          color="red"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              : <h3 style={{ margin: 10 }}>Não há nenhum grupo cadastrado</h3>
            }
          </div>
        }

        <div className="Create-Button">
          {this.state.funcionarios.length ?
            <div onClick={() => this.props.openCreateGroup()}>
              Cadastrar{' '}
              <FaPlusCircle color="green" size="1.8em" />
            </div>
            :
            !this.state.loading ?
              <Link
                to="/management/employees"
                onClick={() => this.props.openManageEmployees()}
              >
                Cadastre funcionários para criar grupos
              </Link>
              :
              null
          }
        </div>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deleteGrupo.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          modalTitle="Remover grupo"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo excluir o grupo?

            {this.state.loading ?
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
          modalTitle="Erro ao remover grupo"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalSuccess}
          toggle={this.toggleModalSuccess.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Editar grupo"
          primaryTitle="Ok"
        />
        {this.state.funcionarios.length ?
          <CommonModal
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit.bind(this)}
            togglePrimary={this.editGrupo.bind(this)}
            toggleSecondary={this.toggleModalEdit.bind(this)}
            centered
            modalTitle="Editar grupo"
            primaryTitle="Salvar"
            secondaryTitle="Cancelar"
          >
            <Form style={{ marginTop: 30 }}>
              <FormGroup row>
                <Label sm="3" size="sm">Nome do grupo</Label>
                <Col sm="6">
                  <Input
                    invalid={this.state.tituloError}
                    bsSize="sm"
                    placeholder="Digite o nome do grupo"
                    onChange={e => this.setState({ titulo: e.target.value, tituloError: '' })}
                    value={this.state.titulo}
                  />
                  <FormFeedback>{this.state.tituloError}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup>
                {this.state.loading ?
                  <div className="Loading">
                    <Loader />
                  </div>
                  : null
                }
              </FormGroup>
            </Form>
          </CommonModal>
          : null
        }
      </div>
    )
  }
}

export default connect(null, { openManageEmployees, openCreateGroup })(ManageGroups)