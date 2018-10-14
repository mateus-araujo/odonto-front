import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { FaRecycle, FaTrashAlt } from 'react-icons/fa'
import classNames from 'classnames/bind'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

import { openShowMessage } from '../../../../store/actions'
import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class MessagesArchived extends Component {
  state = {
    mensagens: [],
    loading: true,
    loadingModal: false,
    message: '',
    idMensagem: '',
    modalError: false,
    modalDelete: false,
    modalRestore: false,
    modalList: false,
    viewedList: []
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getMensagens() {
    this.setState({ loading: true })

    await api.get(`/mensagens/arquivadas/${this.props.user.id}`)
      .then(response => {
        const { mensagens } = response.data

        this.setState({ mensagens })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  async deleteMensagem() {
    this.setState({ loadingModal: true })

    const { idMensagem } = this.state

    await api.put(`/mensagens/apagar/${idMensagem}/${this.props.user.id}/3`)
      .then(() => {
        this.setState({ modalDelete: false, idMensagem: '' })
        this.getMensagens()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loadingModal: false })
  }

  async restoreMensagem() {
    this.setState({ loadingModal: true })

    const { idMensagem } = this.state

    await api.put(`/mensagens/restaurar/${idMensagem}/${this.props.user.id}`)
      .then(() => {
        this.setState({ modalRestore: false, idMensagem: '' })
        this.getMensagens()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loadingModal: false })
  }

  componentDidMount() {
    this.getMensagens()
  }

  toggleModalDelete() {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  toggleModalError() {
    this.setState({ modalError: false, modalRestore: false, modalDelete: false })
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
          <div>
            {this.state.mensagens.length ?
              <div className="List">
                <Row className="Labels">
                  <Col sm="3">Remetente</Col>
                  <Col sm="4">Assunto</Col>
                  <Col sm={{ size: '3', offset: '2' }} style={{ paddingLeft: 50 }}>Remover/Restaurar</Col>
                </Row>

                <div className="Scrollable">
                  {this.state.mensagens.map(mensagem => {
                    const className = classNames({
                      'Message-Item': true,
                      'Message-Item-NotRead': !mensagem.status[0].visualizada
                    })

                    const message_id = mensagem.id

                    return (
                      <Row key={mensagem.id} className={className}>
                        <Col
                          sm="4"
                          className="No-Wrap-Ellipsis"
                          onClick={() => this.props.openShowMessage({ message_id })}
                        >
                          {mensagem.remetente.name}
                        </Col>
                        <Col
                          sm="3"
                          className="No-Wrap-Ellipsis"
                          onClick={() => this.props.openShowMessage({ message_id })}
                        >
                          {mensagem.assunto}
                        </Col>
                        <Col
                          sm="3"
                          onClick={() => this.props.openShowMessage({ message_id })}
                        >
                          {
                            moment(mensagem.createdAt).format('DD/MM/YY') + ' | ' +
                            moment(mensagem.createdAt).format('HH:MM')
                          }
                        </Col>
                        <Col sm="2">
                          <Row>
                            <Col sm="5"></Col>
                            <Col sm="2" onClick={() => this.setState({
                              modalDelete: !this.state.modalDelete,
                              idMensagem: mensagem.id
                            })}
                            >
                              <FaTrashAlt color="red" />
                            </Col>
                            <Col sm="2" onClick={() => this.setState({
                              modalRestore: !this.state.modalRestore,
                              idMensagem: mensagem.id
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
              : <h3 style={{ margin: 10 }}>Não há nenhuma mensagem arquivada por você</h3>
            }
          </div>
        }

        <CommonModal
          isOpen={this.state.modalRestore}
          toggle={this.toggleModalRestore.bind(this)}
          togglePrimary={this.restoreMensagem.bind(this)}
          toggleSecondary={() => this.setState({ modalRestore: false })}
          centered
          modalTitle="Restaurar mensagem"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo restaurar essa mensagem?

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
          togglePrimary={this.deleteMensagem.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          modalTitle="Remover Mensagem"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo excluir essa mensagem?

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

export default connect(mapStateToProps, { openShowMessage })(MessagesArchived)
