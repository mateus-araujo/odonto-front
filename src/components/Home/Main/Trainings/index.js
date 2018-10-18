import React, { Component } from 'react'
import { Button, Table } from 'reactstrap'
import _ from 'lodash'
import { connect } from 'react-redux'

import { openShowTrainingVideo } from '../../../../store/actions'
import api from '../../../../services/api'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'

class Trainings extends Component {
  state = {
    treinamentos: [],
    selectedTreinamento: [],
    loading: true,
    modalAssistirAula: false,
    modalFazerProva: false
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getTreinamentos() {
    this.setState({ loading: true })

    await api.get(`/treinamentos/user/${this.props.user.id}`)
      .then(response => {
        const { treinamentos } = response.data

        this.setState({ treinamentos })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  async changeStatus(treinamento_id) {
    await api.put(`/treinamentos/${treinamento_id}`, {
      status: "Aguardando notas"
    })

    this.getTreinamentos()
  }

  componentDidMount() {
    this.getTreinamentos()
  }

  toggleModalAssistirAula() {
    const training_id = this.state.selectedTreinamento.id

    this.props.openShowTrainingVideo({ training_id })
  }

  toggleModalFazerProva() {
    const { selectedTreinamento } = this.state

    this.setState({ modalFazerProva: false })

    window.open(selectedTreinamento.prova.formulario, '_blank')
    this.changeStatus(selectedTreinamento.id)
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
                    <th>Treinamentos</th>
                    <th className="Col-Deadline">Prazo</th>
                    <th className="Col-Button"></th>
                    <th className="Col-Button"></th>
                    <th className="Col-Note">Nota/Situação</th>
                  </tr>
                </thead>
                <tbody className="Scrollable-Table">
                  {this.state.treinamentos.map(treinamento => {
                    const training_id = treinamento.id

                    console.log(treinamento.prova)

                    return (
                      <tr key={treinamento.id}>
                        <td>{treinamento.titulo}</td>
                        <td className="Col-Deadline">{treinamento.prazo}</td>
                        <td className="Col-Button">
                          <Button
                            size="sm" color="info"
                            disabled={treinamento.status === 'Encerrado'}
                            onClick={() => {
                              if (treinamento.status === "Não iniciado")
                                this.setState({
                                  modalAssistirAula: true,
                                  selectedTreinamento: treinamento
                                })
                              else
                                this.props.openShowTrainingVideo({ training_id })
                            }}
                          >
                            Assistir aula
                        </Button>
                        </td>
                        <td className="Col-Button">
                          <Button size="sm" color="success" disabled={treinamento.status === 'Encerrado'}
                            onClick={() => {
                              if (treinamento.status === "Não iniciado" || treinamento.status === "Executando")
                                this.setState({
                                  modalFazerProva: true,
                                  selectedTreinamento: treinamento
                                })
                              else
                                window.open(treinamento.prova.formulario, '_blank')
                            }}
                          >
                            Fazer a prova
                          </Button>
                        </td>
                        <td className="Col-Note">
                          {
                            treinamento.status === 'Encerrado' ?
                              treinamento.prova.notas[0].nota.toFixed(1)
                              : '-'
                          }
                        </td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </Table>
            </div>
            : <h3 style={{ margin: 10 }}>Não há nenhum treinamento vinculado a você</h3>
        }

        <CommonModal
          isOpen={this.state.modalAssistirAula}
          toggle={() => this.setState({ modalAssistirAula: false })}
          togglePrimary={this.toggleModalAssistirAula.bind(this)}
          toggleSecondary={() => this.setState({ modalAssistirAula: false })}
          centered
          modalTitle="Assistir aula"
          primaryTitle="Continuar"
          secondaryTitle="Cancelar"
        >
          <div>
            Ao clicar em Assistir aula, o sistema mudará o status do treinamento
            para "Executando". Caso não possa assistir a aula agora,
            deixe para um outro momento.
          </div>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalFazerProva}
          toggle={() => this.setState({ modalFazerProva: false })}
          togglePrimary={this.toggleModalFazerProva.bind(this)}
          toggleSecondary={() => this.setState({ modalFazerProva: false })}
          centered
          modalTitle="Fazer prova"
          primaryTitle="Continuar"
          secondaryTitle="Cancelar"
        >
          <div>
            Ao clicar em Fazer a prova, o sistema mudará o status do treinamento
            para "Aguardando notas". Caso não possa fazer a prova agora,
            deixe para um outro momento.
          </div>
        </CommonModal>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth

  return { user }
}

export default connect(mapStateToProps, { openShowTrainingVideo })(Trainings)
