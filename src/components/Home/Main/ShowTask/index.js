import _ from 'lodash'
import React, { Component } from 'react'
import { Button, ButtonGroup, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CommonModal from '../../../CommonModal'
import api from '../../../../services/api'
import Loader from '../../../Loader'
import './styles.css'

class ShowTask extends Component {
  state = {
    id: '',
    assunto: '',
    texto: '',
    status: '',
    prazo: '',
    visualizada: '',
    motivo: '',
    remetente: '',
    destinatario: '',
    message: '',
    loading: true,
    loadingStatus: false,
    modalMotivo: false,
    modalError: false
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
    this.baseState = this.state
  }

  async readTarefa() {
    const { task_id } = this.props.match.params

    await api.put(`/tarefas/visualizar/${task_id}/${this.props.user.id}`)
  }

  async getTarefa() {
    this.setState({ loading: true })

    const { task_id } = this.props.match.params

    await api.get(`/tarefas/${task_id}`)
      .then(response => {
        const {
          id, assunto, texto, status,
          prazo, visualizada, motivo,
          remetente, destinatario
        } = response.data.tarefa

        this.setState({
          id, assunto, texto, status,
          prazo, visualizada, motivo,
          remetente, destinatario
        })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  async changeStatus(status, id) {
    this.setState({ loadingStatus: true })
    let motivo = ''

    if (this.state.motivo.length > 0)
      motivo = this.state.motivo

    if (status === 'cancelled' && !this.state.motivo.length)
      this.setState({
        modalError: true,
        message: 'Você precisa digitar um motivo para cancelar a tarefa'
      })
    else {
      await api.put(`/tarefas/${id}`, {
        status,
        motivo
      })
        .then(() => {
          this.setState(this.baseState)
          this.getTarefa()
        })
        .catch(({ response }) => {
          console.log(response)
        })
    }

    this.setState({ loadingStatus: false })
  }

  componentDidMount() {
    this.getTarefa()
    this.readTarefa()
  }

  toggleModalMotivo() {
    this.setState(this.baseState)
    this.getTarefa()
  }

  toggleModalError() {
    this.setState({ modalError: !this.state.modalError })
  }

  renderStatusButton() {
    const { id, status } = this.state

    if (status === "waiting")
      return (
        <Button style={{ inlineSize: 170 }} size="sm" color="primary"
          onClick={() => this.changeStatus('doing', id)}
        >
          {this.state.loadingStatus ?
            <Loader color="#FFF" />
            : 'Executar tarefa'
          }
        </Button>
      )
    else if (status === "doing")
      return (
        <Button style={{ inlineSize: 170 }} size="sm" color="success"
          onClick={() => this.changeStatus('verifying', id)}
        >
          {this.state.loadingStatus ?
            <Loader color="#FFF" />
            : 'Finalizar tarefa'
          }
        </Button>
      )
    else if (status === "verifying")
      return (
        <Button style={{ inlineSize: 170 }} size="sm" color="warning" disabled>
          Aguardando resposta...
        </Button>
      )
    else if (status === "completed")
      return (
        <Button style={{ inlineSize: 170 }} size="sm" color="info" disabled>
          Concluída
        </Button>
      )
    else if (status === "not_completed")
      return (
        <Button style={{ inlineSize: 170 }} size="sm" color="secondary" disabled>
          Não concluída
        </Button>
      )
    else if (status === "cancelled")
      return (
        <Button style={{ inlineSize: 170 }} size="sm" color="danger" disabled>
          Cancelada
        </Button>
      )
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          <div style={{ margin: 10 }}>
            <h2>{this.state.assunto}</h2>
            <p>
              <div>
                De: {this.state.remetente.id === this.props.user.id ?
                  'mim, ' + this.state.remetente.name
                  : this.state.remetente.name}
              </div>
              <div>
                Para: {this.state.destinatario.id === this.props.user.id ?
                  'mim, ' + this.state.destinatario.name
                  : this.state.destinatario.name}
              </div>
            </p>

            <p>
              Prazo: {this.state.prazo}
            </p>

            <p>O que é para ser feito?</p>
            <div className="Task-Text">
              <p>
                {this.state.texto}
              </p>
            </div>

            <Row style={{ marginTop: 30 }}>
              <Col sm="1">
                <Button size="sm"
                  onClick={this.props.history.goBack.bind(this)}
                >
                  Voltar
                </Button>
              </Col>


              {this.state.status !== 'cancelled'
                && this.state.status !== 'completed'
                && this.state.status !== 'not_completed' ?
                <Col sm="2">
                  <Button size="sm" color="danger"
                    onClick={() => this.setState({ modalMotivo: true })}
                  >
                    Cancelar tarefa
                  </Button>
                </Col>
                : this.state.status === 'cancelled' ?
                  <Col sm="2">
                    <Button size="sm" color="info"
                      onClick={() => this.setState({ modalMotivo: true })}
                    >
                      Ver motivo
                  </Button>
                  </Col>
                  : null
              }

              {this.props.user.id === this.state.destinatario.id ?
                <Col sm="2">
                  {this.renderStatusButton()}
                </Col>
                : null
              }
            </Row>
          </div>
        }

        {this.state.remetente.id === this.props.user.id ?
          <div style={{ position: 'absolute', right: 20, top: 10 }}>
            <Row className="Container">
              <Col sm="8">
                Visualização
              </Col>

              <Col sm="4">
                {this.state.visualizada ?
                  <FaCheckCircle color="green" />
                  : <FaTimesCircle color="gray" />
                }
              </Col>
            </Row>

            <Row className="Container">
              <Col sm="8">
                {this.state.status === 'waiting' ?
                  'Tarefa pendente'
                  : this.state.status === 'doing' ?
                    'Tarefa em execução'
                    : this.state.status === 'verifying' ?
                      'Tarefa concluída?'
                      : this.state.status === 'completed' ?
                        'Tarefa completada'
                        : this.state.status === 'not_completed' ?
                          'Tarefa não completada'
                          : 'Tarefa cancelada'
                }
              </Col>
              <Col sm="4">
                {this.state.status === 'verifying' ?
                  !this.state.loadingStatus ?
                    <ButtonGroup size="sm" style={{ marginLeft: -30 }}>
                      <Button size="sm" color="primary"
                        onClick={() => this.changeStatus('completed', this.state.id)}
                      >
                        Sim
                      </Button>
                      <Button size="sm" color="secondary"
                        onClick={() => this.changeStatus('not_completed', this.state.id)}
                      >
                        Não
                      </Button>
                    </ButtonGroup>
                    :
                    <div className="Loading">
                      <Loader />
                    </div>
                  : this.state.status === 'completed' ?
                    <FaCheckCircle color="green" />
                    : this.state.status === 'doing' ?
                      <FaCheckCircle color="#007BFF" />
                      : this.state.status === 'not_completed' || this.state.status === 'waiting' ?
                        <FaTimesCircle color="gray" />
                        : <FaTimesCircle color="red" />
                }
              </Col>
            </Row>
          </div>
          : null
        }

        <CommonModal
          isOpen={this.state.modalMotivo}
          toggle={this.toggleModalMotivo.bind(this)}
          togglePrimary={() => this.changeStatus('cancelled', this.state.id)}
          toggleSecondary={() => this.setState({ modalMotivo: false })}
          centered
          modalTitle={this.state.status === 'cancelled' ? 'Ver motivo' : 'Cancelar tarefa'}
          primaryTitle={this.state.status === 'cancelled' ? 'Ok' : 'Enviar'}
          secondaryTitle={this.state.status === 'cancelled' ? '' : 'Cancelar'}
        >
          <Form>
            <FormGroup>
              <Col>
                <Input
                  disabled={this.state.status === 'cancelled'}
                  bsSize="sm"
                  style={{ height: 150, minHeight: 100, maxHeight: 200 }}
                  type="textarea"
                  placeholder="Digite um motivo para cancelamento da tarefa"
                  onChange={e => this.setState({ motivo: e.target.value })}
                  value={this.state.motivo}
                />
              </Col>
            </FormGroup>

            {this.state.loadingModal ?
              <div className="Loading">
                <Loader />
              </div>
              : null
            }
          </Form>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalError}
          toggle={this.toggleModalError.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Erro ao cancelar tarefa"
          primaryTitle="Ok"
        />
      </div >
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth

  return { user }
}

export default withRouter(connect(mapStateToProps, {})(ShowTask))
