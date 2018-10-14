import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FaFileArchive, FaTrashAlt } from 'react-icons/fa'
import _ from 'lodash'
import classNames from 'classnames/bind'
import moment from 'moment'
import { connect } from 'react-redux'


import { openShowTask } from '../../../../store/actions'
import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class TasksInbox extends Component {
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

    await api.get(`/tarefas/entrada/${this.props.user.id}`)
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

    await api.put(`/tarefas/apagar/${idTarefa}/${this.props.user.id}/1`)
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
    if (tarefa.status === "waiting")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="primary"
          onClick={() => this.changeStatus('doing', tarefa.id)}
        >
          {this.state.loadingStatus ?
            <Loader color="#FFF" />
            : 'Executar'
          }
        </Button>
      )
    else if (tarefa.status === "doing")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="success"
          onClick={() => this.changeStatus('verifying', tarefa.id)}
        >
          {this.state.loadingStatus ?
            <Loader color="#FFF" />
            : 'Finalizar'
          }
        </Button>
      )
    else if (tarefa.status === "verifying")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="warning" disabled>
          Aguardando...
        </Button>
      )
    else if (tarefa.status === "completed")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="info" disabled>
          Concluída
        </Button>
      )
    else if (tarefa.status === "not_completed")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="secondary" disabled>
          Não concluída
        </Button>
      )
    else if (tarefa.status === "cancelled")
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
                <Col sm="2">Remetente</Col>
                <Col sm="3">Assunto</Col>
                <Col sm={{ size: '2', offset: '3' }}>Status</Col>
                <Col sm="2">Opções</Col>
              </Row>

              <div className="Scrollable">
                {this.state.tarefas.map(tarefa => {
                  const className = classNames({
                    'Task-Item': true,
                    'Task-Item-NotRead': !tarefa.visualizada
                  })

                  const task_id = tarefa.id

                  return (
                    <Row key={tarefa.id} className={className}>
                      <Col sm="2" className="No-Wrap-Ellipsis"
                        onClick={() => this.props.openShowTask({ task_id })}
                      >
                        {tarefa.remetente.name}
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
                          <Col>
                            {this.renderStatusButton(tarefa)}
                          </Col>

                          <Col sm="1" style={{ padding: 10 }}
                            onClick={() => this.setState({
                              modalDelete: !this.state.modalDelete,
                              idTarefa: tarefa.id
                            })}
                          >
                            <FaTrashAlt color="red" />
                          </Col>

                          <Col sm="1" style={{ padding: 10, marginRight: 15 }}
                            onClick={() => this.setState({
                              modalArchive: !this.state.modalArchive,
                              idTarefa: tarefa.id
                            })}
                          >
                            <FaFileArchive color="green" />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )
                }
                )}
              </div>
            </div>
            : <h3 style={{ margin: 10 }}>Não há nenhuma tarefa na caixa de entrada</h3>
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

export default connect(mapStateToProps, { openShowTask })(TasksInbox)
