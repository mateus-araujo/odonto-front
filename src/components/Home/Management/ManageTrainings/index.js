import React, { Component } from 'react'
import _ from 'lodash'
import { Table } from 'reactstrap'
import { FaEdit, FaEye, FaPencilAlt, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import { connect } from 'react-redux'

import { openCreateTraining, openEditTraining, openSetNotesTraining } from '../../../../store/actions'
import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class ManageTrainings extends Component {
  state = {
    treinamentos: [],
    notas: [],
    idTreinamento: '',
    message: '',
    loading: true,
    loadingModal: false,
    modalNotas: false
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getTreinamentos() {
    this.setState({ loading: true })

    await api.get('/treinamentos/')
      .then(response => {
        const { treinamentos } = response.data

        this.setState({ treinamentos })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  async deleteTreinamento() {
    this.setState({ loadingModal: true })

    const { idTreinamento } = this.state

    await api.delete(`/treinamentos/${idTreinamento}`)
      .then(() => {
        this.setState({ modalDelete: false })
        this.getTreinamentos()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })
      .finally(() => {
        this.setState({ loadingModal: false })
      })
  }

  componentDidMount() {
    this.getTreinamentos()
  }

  toggleModalNotas() {
    this.setState({ modalNotas: false })
  }

  toggleModalDelete() {
    this.setState({ modalDelete: false })
  }

  toggleModalError() {
    this.setState({ modalError: false })
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          this.state.treinamentos.length ?
            <div style={{ fontSize: 14 }}>
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th>Treinamento</th>
                    <th>Usuários</th>
                    <th className="Col-Deadline">Prazo</th>
                    <th>Status</th>
                    <th className="Col-Icon"></th>
                    <th className="Col-Icon"></th>
                  </tr>
                </thead>
                <tbody className="Scrollable-Table">
                  {this.state.treinamentos.map(treinamento => {
                    const destinatariosLength = treinamento.destinatarios.length

                    const training_id = treinamento.id

                    return (
                      <tr key={treinamento.id}>
                        <td>{treinamento.titulo}</td>
                        <td>
                          {treinamento.destinatarios.map((destinatario, i) =>
                            <React.Fragment key={destinatario.id}>
                              {i === destinatariosLength - 1 ?
                                destinatario.name
                                :
                                destinatario.name + ' / '
                              }
                            </React.Fragment>
                          )}
                        </td>
                        <td className="Col-Deadline">{treinamento.prazo}</td>
                        <td>{treinamento.status}</td>
                        <td className="Col-Icon">
                          {treinamento.status === "Não iniciado" || treinamento.status === "Executando" ?
                            <FaPencilAlt
                              style={{ cursor: 'pointer' }}
                              size="1.4em"
                              onClick={() => this.props.openEditTraining({ training_id })}
                              color="orange"
                            />
                            : treinamento.status === "Aguardando notas" ?
                              <FaEdit
                                style={{ cursor: 'pointer' }}
                                size="1.6em"
                                onClick={() => this.props.openSetNotesTraining({ training_id })}
                                color="#17A2B8"
                              />
                              : <FaEye
                                style={{ cursor: 'pointer' }}
                                size="1.7em"
                                onClick={() => this.setState({
                                  idTreinamento: treinamento.id,
                                  notas: treinamento.prova.notas,
                                  modalNotas: true
                                })}
                                color="green"
                              />
                          }
                        </td>
                        <td className="Col-Icon">
                          <FaTrashAlt
                            style={{ cursor: 'pointer' }}
                            onClick={() => this.setState({ modalDelete: true, idTreinamento: treinamento.id })}
                            color="red"
                          />
                        </td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </Table>
            </div>
            : <h3 style={{ margin: 10 }}>Não há nenhum treinamento cadastrado</h3>
        }

        {!this.state.loading ?
          <div className="Create-Button" onClick={() => this.props.openCreateTraining()}>
            Cadastrar{' '}
            <FaPlusCircle color="green" size="1.8em" />
          </div>
          : null
        }

        <CommonModal
          isOpen={this.state.modalNotas}
          toggle={this.toggleModalNotas.bind(this)}
          modalTitle="Notas"
          primaryTitle="Ok"
          style={{ maxWidth: '40%' }}
        >
          {this.state.notas.length > 0 ?
            <Table size="sm" striped bordered responsive>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody className="Scrollable-Modal">
                {this.state.notas.map(item =>
                  <tr key={item.id}>
                    <td>{item.usuario.name}</td>
                    <td>{item.usuario.email}</td>
                    <td>
                      {item.nota.toFixed(1)}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            : <h5>Não foi carregada nenhuma nota</h5>
          }
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deleteTreinamento.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          modalTitle="Remover treinamento"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo excluir o treinamento?

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
          modalTitle="Erro ao remover treinamento"
          primaryTitle="Ok"
        />
      </div>
    )
  }
}

export default connect(null, { openCreateTraining, openEditTraining, openSetNotesTraining })(ManageTrainings)
