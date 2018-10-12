import _ from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import Loader from '../../../Loader'

class ShowTask extends Component {
  state = {
    assunto: '', 
    texto: '', 
    status: '',
    prazo: '',
    visualizada: '',
    motivo: '',
    remetente: '', 
    destinatario: '',
    loading: true
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async readTarefa() {
    const { message_id } = this.props.match.params

    await api.put(`/tarefas/visualizar/${message_id}/${this.props.user.id}`)
  }

  async getTarefa() {
    this.setState({ loading: true })

    const { task_id } = this.props.match.params

    await api.get(`/tarefas/${task_id}`)
      .then(response => {
        console.log(response.data)
        const {
          assunto, texto, status, 
          prazo, visualizada, motivo,
          remetente, destinatario
        } = response.data.tarefa

        this.setState({
          assunto, texto, status, 
          prazo, visualizada, motivo,
          remetente, destinatario
        })
      })
      .catch(({ response }) => {
        console.log(response)
      })

    this.setState({ loading: false })
  }

  componentDidMount() {
    this.getTarefa()
    this.readTarefa()
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

export default withRouter(connect(mapStateToProps, {})(ShowTask))
