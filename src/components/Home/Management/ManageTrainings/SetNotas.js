import React, { Component } from 'react'
import { Button, Col, Input, Table, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class SetNotas extends Component {
  state = {
    treinamento: [],
    notas: [],
    loading: true,
    loadingButton: false,
    loadingModal: false,
    modalMessage: false,
    modalSave: false
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async setNotes() {
    const { training_id } = this.props.match.params

    this.setState({ loadingModal: true })

    const { notas } = this.state

    await api.put(`/treinamentos/notas/${training_id}`, {
      notas
    })
      .then(() => {
        this.setState({ modalMessage: true, message: 'Notas cadastradas com sucesso' })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loadingModal: false })
  }

  async getTreinamento() {
    const { training_id } = this.props.match.params

    this.setState({ loading: true })

    await api.get(`/treinamentos/${training_id}`)
      .then(response => {
        const { treinamento } = response.data

        this.setState({ treinamento, notas: treinamento.prova.notas })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  handleChangeNote(id, nota) {
    let notas = this.state.notas
    notas[id].nota = nota

    console.log(notas)
    this.setState({ notas })
  }

  componentDidMount() {
    this.getTreinamento()
  }

  toggleModalSave() {
    this.setState({ modalSave: false })
  }

  toggleModalMessage() {
    this.setState({ modalMessage: false })
    this.props.history.goBack()
  }

  render() {
    // console.log(this.state.notas)
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          this.state.notas.length > 0 ?
            <div style={{ fontSize: 14 }}>
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th>Treinamento</th>
                    <th>Usuário</th>
                    <th className="Col-Deadline">Nota</th>
                  </tr>
                </thead>
                <tbody className="Scrollable-Table">
                  {this.state.notas.map((item, id) => {
                    return (
                      <tr key={item.id}>
                        <td>{this.state.treinamento.titulo}</td>
                        <td>
                          {item.usuario.name}
                        </td>
                        <td className="Col-Deadline">
                          <Input
                            type="number"
                            bsSize="sm"
                            min="0"
                            max="10"
                            step=".1"
                            onChange={(e) => this.handleChangeNote(id, e.target.value)}
                            value={item.nota}
                          />
                        </td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </Table>

              <Row>
                <Col sm={{ offset: '10', size: '2' }}>
                  <Button
                    onClick={() => this.setState({ modalSave: true })}
                    size="sm"
                    color="primary"
                    style={{ inlineSize: 100 }}
                  >
                    {this.state.loadingButton ?
                      <Loader color="#FFF" />
                      : 'Salvar'
                    }
                  </Button>
                </Col>
              </Row>
            </div>
            : null
        }

        <CommonModal
          isOpen={this.state.modalSave}
          toggle={this.toggleModalSave.bind(this)}
          togglePrimary={this.setNotes.bind(this)}
          toggleSecondary={() => this.setState({ modalSave: false })}
          centered
          modalTitle="Salvar notas"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
        >
          <div>
            Deseja salvar as notas agora?

            {this.state.loadingModal ?
              <div className="Loading">
                <Loader />
              </div>
              : null
            }
          </div>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalMessage}
          toggle={this.toggleModalMessage.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Editar treinamento"
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

export default withRouter(connect(mapStateToProps, {})(SetNotas))
