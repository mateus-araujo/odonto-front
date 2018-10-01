import _ from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import Loader from '../../../Loader'

class ShowMessage extends Component {
  state = {
    assunto: '',
    remetente: '',
    destinatarios: [],
    texto: '',
    loading: true
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async readMensagem () {
    const { message_id } = this.props.match.params

    await api.put(`/mensagens/visualizar/${message_id}/${this.props.user.id}`)
  }

  async getMensagem() {
    this.setState({ loading: true })

    const { message_id } = this.props.match.params

    await api.get(`/mensagens/${message_id}`)
      .then(response => {
        const { mensagens } = response.data

        this.setState({
          assunto: mensagens.assunto,
          remetente: mensagens.remetente,
          destinatarios: mensagens.destinatarios,
          texto: mensagens.texto
        })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  componentDidMount() {
    this.getMensagem()
    this.readMensagem()
  }

  render() {
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
                     'mim'
                    : this.state.remetente.name }
              </div>
              <div>
                Para: {this.state.destinatarios.map((destinatario, i) =>
                  <React.Fragment key={destinatario.id}>
                    {i === this.state.destinatarios.length - 1 ?
                      destinatario.id === this.props.user.id ?
                        'mim'
                        :
                        destinatario.name
                      :
                      destinatario.id === this.props.user.id ?
                        'mim; '
                        : destinatario.name + '; '
                    }
                  </React.Fragment>
                )}
              </div>
            </p>

            <div className="Message-Text">
              <p style={{ margin: 10 }}>
                {this.state.texto}
              </p>
            </div>
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

export default withRouter(connect(mapStateToProps, {})(ShowMessage))
