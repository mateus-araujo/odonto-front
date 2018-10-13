import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { FaRecycle, FaTrashAlt } from 'react-icons/fa'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

import { openShowTask } from '../../../../store/actions'
import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class TasksArchived extends Component {
  state = {
    tarefas: [],
    loading: true,
    loadingModal: false,
    message: '',
    idTarefa: '',
    modalError: false,
    modalDelete: false,
    modalRestore: false,
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getTarefas() {
    this.setState({ loading: true })

    await api.get(`/tarefas/arquivadas/${this.props.user.id}`)
      .then(response => {
        const { tarefas } = response.data

        this.setState({ tarefas })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  async deleteTarefa() {
    this.setState({ loadingModal: true })

    const { idTarefa } = this.state

    await api.put(`/tarefas/apagar/${idTarefa}/${this.props.user.id}/3`)
      .then(() => {
        this.setState({ modalDelete: false, idTarefa: '' })
        this.getTarefas()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loadingModal: false })
  }

  async restoreTarefa() {
    this.setState({ loadingModal: true })

    const { idTarefa } = this.state

    await api.put(`/tarefas/restaurar/${idTarefa}/${this.props.user.id}`)
      .then(() => {
        this.setState({ modalRestore: false, idTarefa: '' })
        this.getTarefas()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loadingModal: false })
  }

  componentDidMount() {
    this.getTarefas()
  }

  toggleModalError() {
    this.setState({ modalError: !this.state.modalError })
  }

  toggleModalDelete() {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  toggleModalRestore() {
    this.setState({ modalRestore: !this.state.modalRestore })
  }

  render() {
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          this.state.tarefas.length ?
            <div className="List">
              <Row className="Labels">
                <Col sm="3">Remetente</Col>
                <Col>Assunto</Col>
                <Col sm={{ size: '3', offset: '2' }}>Data</Col>
                <Col sm="2">Opções</Col>
              </Row>

              <div className="Scrollable">
                {this.state.tarefas.map(tarefa => {
                  const task_id = tarefa.id

                  return (
                    <Row key={tarefa.id} className="Task-Item">
                      <Col sm="3" className="No-Wrap-Ellipsis"
                        onClick={() => this.props.openShowTask({ task_id })}
                      >
                        {tarefa.remetente.name}
                      </Col>
                      <Col className="No-Wrap-Ellipsis"
                        onClick={() => this.props.openShowTask({ task_id })}
                      >
                        {tarefa.assunto}
                      </Col>
                      <Col sm="2">
                        {moment(tarefa.createdAt).format('DD/MM/YYYY')}
                      </Col>
                      <Col sm="2">
                        <Row>
                          <Col sm="5"></Col>
                          <Col sm="2" 
                            onClick={() => this.setState({
                              modalDelete: !this.state.modalDelete,
                              idTarefa: tarefa.id
                            })}
                          >
                            <FaTrashAlt color="red" />
                          </Col>
                          <Col sm="2" 
                            onClick={() => this.setState({
                              modalRestore: !this.state.modalRestore,
                              idTarefa: tarefa.id
                            })}
                          >
                            <FaRecycle color="green" />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )
                }
                )}
              </div>
            </div>
            : <h3 style={{ margin: 10 }}>Não há nenhuma tarefa arquivada</h3>
        }

        <CommonModal
          isOpen={this.state.modalRestore}
          toggle={this.toggleModalRestore.bind(this)}
          togglePrimary={this.restoreTarefa.bind(this)}
          toggleSecondary={() => this.setState({ modalRestore: false })}
          centered
          modalTitle="Arquivar tarefa"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo restaurar essa tarefa?

            {this.state.loadingModal ?
              <div className="Loading">
                <Loader />
              </div>
              : null
            }
          </div>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deleteTarefa.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          modalTitle="Remover tarefa"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo excluir essa tarefa?

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
          modalTitle="Erro na operação"
          primaryTitle="Ok"
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth

  return { user }
}

export default connect(mapStateToProps, { openShowTask })(TasksArchived)
