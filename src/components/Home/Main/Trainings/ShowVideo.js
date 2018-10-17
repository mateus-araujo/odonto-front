import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import Loader from '../../../Loader'

class ShowVideo extends Component {
  state = {
    treinamento: [],
    loading: true
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }


  async getTreinamento() {
    const { training_id } = this.props.match.params

    this.setState({ loading: true })

    await api.get(`/treinamentos/${training_id}`)
      .then(response => {
        const { treinamento } = response.data

        if (treinamento.status === "Não iniciado")
          api.put(`/treinamentos/${treinamento.id}`, {
            status: 'Executando'
          })

        this.setState({ treinamento })
      })
      .catch(({ response }) => {
        console.log(response)
      })

      this.setState({ loading: false })
  }

  componentDidMount() {
    this.getTreinamento()
  }

  render() {
    console.log(this.state.treinamento.status)
    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          <div>
            <h3 style={{ marginBottom: 20 }}>{this.state.treinamento.titulo}</h3>
            <div style={{ textAlign: 'center' }}>
              <iframe
                title={this.state.treinamento.id}
                width="620"
                height="320"
                src={this.state.treinamento.url}
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe>
            </div>

            <Row style={{ marginTop: 30 }}>
              <Col sm={{ offset: 1, size: 1 }}>
                <Button size="sm" onClick={this.props.history.goBack.bind(this)}>
                  Voltar
                </Button>
              </Col>
            </Row>
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

export default withRouter(connect(mapStateToProps, {})(ShowVideo))
