import React, { Component } from 'react'
import { Button, ButtonGroup, Col, Row } from 'reactstrap'
import { FaFileArchive, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

import { openShowTask } from '../../../../store/actions'
import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class TasksSent extends Component {
  state = {
    tarefas: [],
    loading: true,
    loadingStatus: false,
    loadingModal: false,
    message: '',
    idTarefa: '',
    modalError: false,
    modalDelete: false,
    modalArchive: false,
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getTarefas() {
    this.setState({ loading: true })

    await api.get(`/tarefas/enviadas/${this.props.user.id}`)
      .then(response => {
        const { tarefas } = response.data

        this.setState({ tarefas })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  async changeStatus(status, tarefaId) {
    this.setState({ loadingStatus: true })

    await api.put(`/tarefas/${tarefaId}`, {
      status,
      motivo: ''
    })
      .then(() => this.getTarefas())
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loadingStatus: false })
  }

  async deleteTarefa() {
    this.setState({ loadingModal: true })

    const { idTarefa } = this.state

    await api.put(`/tarefas/apagar/${idTarefa}/${this.props.user.id}/2`)
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

  async archiveTarefa() {
    this.setState({ loadingModal: true })

    const { idTarefa } = this.state

    await api.put(`/tarefas/arquivar/${idTarefa}/${this.props.user.id}`)
      .then(() => {
        this.setState({ modalArchive: false, idTarefa: '' })
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
    this.setState({ modalError: false, modalArchive: false, modalDelete: false })
  }

  toggleModalDelete() {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  toggleModalArchive() {
    this.setState({ modalArchive: !this.state.modalArchive })
  }

  renderStatusButton(tarefa) {
    const { status, id } = tarefa

    if (status === "waiting")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="info" disabled>
          Pendente
        </Button>
      )
    else if (status === "doing")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="primary" disabled>
          Executando
        </Button>
      )
    else if (status === "verifying")
      return (
        <div style={{ margin: 5, inlineSize: 110, paddingLeft: 30 }}>
          <Row style={{ paddingLeft: 10 }} >Confirmar</Row>
          <Row>
            {this.state.loadingStatus ?
              <div className="Loading">
                <Loader />
              </div>
              :
              <ButtonGroup size="sm">
                <Button size="sm" color="primary"
                  onClick={() => this.changeStatus('completed', id)}
                >
                  Sim
                </Button>
                <Button size="sm" color="secondary"
                  onClick={() => this.changeStatus('not_completed', id)}
                >
                  Não
                </Button>
              </ButtonGroup>
            }
          </Row>
        </div>
      )
    else if (status === "completed")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="info" disabled>
          Concluída
        </Button>
      )
    else if (status === "not_completed")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="secondary" disabled>
          Não concluída
        </Button>
      )
    else if (status === "cancelled")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="danger" disabled>
          Cancelada
        </Button>
      )
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
                <Col sm="3">Destinatário</Col>
                <Col sm="3">Assunto</Col>
                <Col sm={{ size: '2', offset: '1' }}>Visualização</Col>
                <Col sm="1">Status</Col>
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
                        {tarefa.destinatario.name}
                      </Col>
                      <Col className="No-Wrap-Ellipsis"
                        onClick={() => this.props.openShowTask({ task_id })}
                      >
                        {tarefa.assunto}
                      </Col>
                      <Col sm="2" className="No-Wrap-Ellipsis" style={{ paddingLeft: 30 }}
                        onClick={() => this.props.openShowTask({ task_id })}
                      >
                        {moment(tarefa.createdAt).format('DD/MM/YYYY')}
                      </Col>
                      <Col sm="4" style={{ paddingLeft: 20 }}>
                        <Row>
                          {tarefa.status === "verifying" ?
                            <Col sm="1" style={{ padding: 10, paddingTop: 20 }}>
                              {tarefa.visualizada ?
                                <FaCheckCircle color="green" />
                                : <FaTimesCircle color="gray" />
                              }
                            </Col>
                            :
                            <Col sm="1" style={{ padding: 10 }}>
                              {tarefa.visualizada ?
                                <FaCheckCircle color="green" />
                                : <FaTimesCircle color="gray" />
                              }
                            </Col>
                          }

                          <Col>
                            {this.renderStatusButton(tarefa)}
                          </Col>


                          {tarefa.status === "verifying" ?
                            <Col sm="1" style={{ padding: 10, paddingTop: 20 }}
                              onClick={() => this.setState({
                                modalDelete: !this.state.modalDelete,
                                idTarefa: tarefa.id
                              })}
                            >
                              <FaTrashAlt color="red" />
                            </Col>
                            :
                            <Col sm="1" style={{ padding: 10 }}
                              onClick={() => this.setState({
                                modalDelete: !this.state.modalDelete,
                                idTarefa: tarefa.id
                              })}
                            >
                              <FaTrashAlt color="red" />
                            </Col>
                          }

                          {tarefa.status === "verifying" ?
                            <Col sm="1" style={{ padding: 10, marginRight: 15, paddingTop: 20 }}
                              onClick={() => this.setState({
                                modalArchive: !this.state.modalArchive,
                                idTarefa: tarefa.id
                              })}
                            >
                              <FaFileArchive color="green" />
                            </Col>
                            :
                            <Col sm="1" style={{ padding: 10, marginRight: 15 }}
                              onClick={() => this.setState({
                                modalArchive: !this.state.modalArchive,
                                idTarefa: tarefa.id
                              })}
                            >
                              <FaFileArchive color="green" />
                            </Col>
                          }
                        </Row>
                      </Col>
                    </Row>
                  )
                }
                )}
              </div>
            </div>
            : <h3 style={{ margin: 10 }}>Não há nenhuma tarefa enviada por você</h3>
        }

        <CommonModal
          isOpen={this.state.modalArchive}
          toggle={this.toggleModalArchive.bind(this)}
          togglePrimary={this.archiveTarefa.bind(this)}
          toggleSecondary={() => this.setState({ modalArchive: false })}
          centered
          modalTitle="Arquivar tarefa"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo arquivar essa tarefa?

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

export default connect(mapStateToProps, { openShowTask })(TasksSent)
