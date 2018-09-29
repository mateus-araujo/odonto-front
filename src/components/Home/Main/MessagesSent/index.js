import React, { Component } from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import { FaFileArchive, FaTrashAlt } from 'react-icons/fa'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class MessagesSent extends Component {
  state = {
    mensagens: [],
    loading: true,
    loadingModal: false,
    message: '',
    idMensagem: '',
    modalError: false,
    modalDelete: false,
    modalArchive: false,
    modalList: false,
    viewedList: []
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getMensagens() {
    this.setState({ loading: true })

    await api.get(`/mensagens/enviadas/${this.props.user.id}`)
      .then(response => {
        let { mensagens } = response.data

        mensagens = mensagens.map(mensagem => {
          if (mensagem.status[0].enviada)
            return mensagem
          else
            return undefined
        })

        mensagens = mensagens.filter(mensagem => 
          mensagem !== undefined ?
            true
          : false
        )

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

    await api.put(`/mensagens/apagar/${idMensagem}/${this.props.user.id}/2`)
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

  async archiveMensagem() {
    this.setState({ loadingModal: true })

    const { idMensagem } = this.state

    await api.put(`/mensagens/arquivar/${idMensagem}/${this.props.user.id}`)
      .then(() => {
        this.setState({ modalArchive: false, idMensagem: '' })
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
    this.setState({ modalError: !this.state.modalDelete })
  }

  toggleModalArchive() {
    this.setState({ modalArchive: !this.state.modalArchive })
  }

  modalVisualizado(status) {
    this.setState({
      modalList: true,
      viewedList: status
    })
  }

  closeModalVisualizado() {
    this.setState({
      modalList: false,
      viewedList: []
    })
  }

  render() {
    console.log(this.state.mensagens)
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
                  <Col sm="3">Destinatário</Col>
                  <Col sm="3">Assunto</Col>
                  <Col sm={{ size: '1', offset: '2' }}>Vizualização</Col>
                  <Col style={{ paddingLeft: 50 }}>Remover/Arquivar</Col>
                </Row>

                <div className="Scrollable">
                  {this.state.mensagens.map(mensagem => {
                    const length = mensagem.destinatarios.length

                    return (
                      <Row key={mensagem.id} className="Message-Item">
                        <Col sm="4" className="No-Wrap-Ellipsis">
                          {mensagem.destinatarios.map((destinatario, i) =>
                            <React.Fragment key={destinatario.id}>
                              {i === length - 1 ?
                                destinatario.name
                                :
                                destinatario.name + ' / '
                              }
                            </React.Fragment>
                          )}
                        </Col>
                        <Col sm="2" className="No-Wrap-Ellipsis">{mensagem.assunto}</Col>
                        <Col sm="2">{moment(mensagem.createdAt).format('DD/MM/YY')}</Col>
                        <Col sm="2" style={{ paddingLeft: 50 }}>
                          {mensagem.status.length > 0 ?
                            <Button
                              style={{ padding: 0 }}
                              size="sm"
                              color="link"
                              onClick={() => this.modalVisualizado(mensagem.status)}
                            >
                              ver
                            </Button>
                            : mensagem.status[1].visualizada ?
                              'Lida'
                              : 'Não lida'
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
                              modalArchive: !this.state.modalArchive,
                              idMensagem: mensagem.id
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
              : <h3 style={{ margin: 10 }}>Não há nenhuma mensagem enviada por você</h3>
            }

            <CommonModal
              isOpen={this.state.modalArchive}
              toggle={this.toggleModalArchive.bind(this)}
              togglePrimary={this.archiveMensagem.bind(this)}
              toggleSecondary={() => this.setState({ modalArchive: false })}
              centered
              modalTitle="Arquivar mensagem"
              primaryTitle="Sim"
              secondaryTitle="Não"
            >
              <div>
                Deseja mesmo arquivar essa mensagem?

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
              isOpen={this.state.modalList}
              toggle={this.closeModalVisualizado.bind(this)}
              modalTitle="Vizualização"
              primaryTitle="Ok"
            >
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Função</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="Scrollable-Modal">
                  {this.state.viewedList.map((mensagem, i) =>
                    i > 0 ?
                      <tr key={mensagem.id}>
                        <td>{mensagem.usuario.name}</td>
                        <td>{mensagem.usuario.funcionario.cargos[0].nome}</td>
                        <td>
                          {mensagem.visualizada ?
                            'Lida'
                            : 'Não lida'
                          }
                        </td>
                      </tr>
                      : null
                  )
                  }
                </tbody>
              </Table>
            </CommonModal>

            <CommonModal
              isOpen={this.state.modalError}
              toggle={this.toggleModalError.bind(this)}
              centered
              message={this.state.message}
              modalTitle="Erro ao remover mensagem"
              primaryTitle="Ok"
            />
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth

  return { user }
}

export default connect(mapStateToProps, {})(MessagesSent)