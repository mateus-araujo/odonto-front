import React, { Component } from 'react'
import _ from 'lodash'
import { Table } from 'reactstrap'
import { FaEdit, FaEye, FaPencilAlt } from 'react-icons/fa'

import api from '../../../../services/api'
import Loader from '../../../Loader'

class ManageTrainings extends Component {
  state = {
    treinamentos: [],
    idTreinamento: '',
    loading: true
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

  componentDidMount() {
    this.getTreinamentos()
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
                    <th className="Col-Deadline"></th>
                  </tr>
                </thead>
                <tbody className="Scrollable-Table">
                  {this.state.treinamentos.map(treinamento => {
                    const destinatariosLength = treinamento.destinatarios.length

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
                        <td className="Col-Deadline">
                          {treinamento.status === "Não iniciado" || treinamento.status === "Executando" ?
                            <FaPencilAlt
                              style={{ cursor: 'pointer' }}
                              size="1.4em"
                              onClick={() => this.setState({
                                idTreinamento: treinamento.id,
                                ...treinamento
                              })}
                              color="orange"
                            />
                            : treinamento.status === "Aguardando notas" ?
                              <FaEdit
                                style={{ cursor: 'pointer' }}
                                size="1.6em"
                                onClick={() => this.setState({
                                  idTreinamento: treinamento.id,
                                  ...treinamento
                                })}
                                color="#17A2B8"
                              />
                              : <FaEye
                                style={{ cursor: 'pointer' }}
                                size="1.7em"
                                onClick={() => this.setState({
                                  idTreinamento: treinamento.id,
                                  ...treinamento
                                })}
                                color="green"
                              />
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
      </div>
    )
  }
}

export default ManageTrainings