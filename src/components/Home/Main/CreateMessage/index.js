import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, Label, Table } from 'reactstrap'
import validator from 'validator'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import Loader from '../../../Loader'
import CommonModal from '../../../CommonModal'

class CreateMessage extends Component {
  state = {
    contatos: '',
    destinatarios: [],
    destinatariosError: '',
    assunto: '',
    assuntoError: '',
    texto: '',
    textoError: '',
    modalContatos: '',
    modalDestinatarios: '',
    modalMessage: '',
    loading: false,
    loadingTable: false,
    busca: '',
    grupos: [],
    selectedGrupos: new Map(),
    funcionarios: [],
    selectedFuncionarios: new Map()
  }

  constructor(props) {
    super(props)

    this.searchGrupos = _.debounce(this.searchGrupos, 300)
    this.searchFuncionarios = _.debounce(this.searchFuncionarios, 300)
    this.componentDidMount = _.debounce(this.componentDidMount, 300)
    this.baseState = this.state
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.assunto)) {
      isError = true
      this.setState({ assuntoError: "Assunto da mensagem não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.texto)) {
      isError = true
      this.setState({ textoError: "Conteúdo da mensagem não pode estar vazio" })
    }

    return isError
  }

  async createMessage() {
    const error = this.validate()

    if (!this.state.destinatarios.length)
      this.setState({ destinatariosError: "Selecione os contatos acima" })

    let remetenteId = this.props.user.id

    if (!error && this.state.destinatarios.length > 0) {
      this.setState({ loading: true })

      const { assunto, texto, destinatarios } = this.state

      await api.post(`/mensagens`, {
        assunto,
        remetenteId,
        texto,
        destinatarios
      })
        .then(() => {
          this.setState({ modalMessage: true, message: "Mensagem enviada" })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modalMessage: true, message: error })
        })
        .finally(() => {
          this.setState({ loading: false })
        })
    }
  }

  async getGrupos() {
    this.setState({ loadingTable: true })

    await api.get('/grupos')
      .then(response => {
        const { grupos } = response.data

        this.setState({ grupos })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })
      .finally(() => {
        this.setState({ loadingTable: false })
      })
  }

  async getFuncionarios() {
    this.setState({ loadingTable: true })

    await api.get('/funcionarios')
      .then(response => {
        const { funcionarios } = response.data

        this.setState({ funcionarios })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })

    this.setState({ loadingTable: false })
  }

  async searchGrupos() {
    if (this.state.busca.length) {
      await api.get(`/search_grupos/${this.state.busca}`)
        .then(response => {
          const { grupos } = response.data

          this.setState({ grupos })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data
          this.setState({ error })
        })
        .finally(() => {
          this.setState({ loadingTable: false })
        })
    } else
      this.getGrupos()
  }

  async searchFuncionarios() {
    if (this.state.busca.length) {
      await api.get(`/search_funcionarios/${this.state.busca}`)
        .then(response => {
          const { funcionarios } = response.data

          this.setState({ funcionarios })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data
          this.setState({ error })
        })
        .finally(() => {
          this.setState({ loadingTable: false })
        })
    } else
      this.getFuncionarios()
  }

  onSearchChange(busca) {
    this.setState({ loadingTable: true, busca })

    this.searchGrupos()
    this.searchFuncionarios()
  }

  handleCheckboxGrupos(e) {
    const grupo = e.target.value
    const selected = e.target.checked
    this.setState(prevState => ({ selectedGrupos: prevState.selectedGrupos.set(grupo, selected) }))
  }

  handleCheckboxContatos(e) {
    const funcionario = e.target.value
    const selected = e.target.checked
    this.setState(prevState => ({ selectedFuncionarios: prevState.selectedFuncionarios.set(funcionario, selected) }))
  }

  toggleModalContatos() {
    let destinatarios = []
    let contatos = ''

    this.state.selectedFuncionarios.forEach((key, value) => {
      if (key === true) {
        value = parseInt(value, 10)
        if (!destinatarios.includes(value)) {
          destinatarios.push(value)

          // eslint-disable-next-line
          this.state.funcionarios.map(funcionario => {
            if (funcionario.usuario.id === value)
              contatos = contatos + funcionario.usuario.name + ' (' + funcionario.usuario.email + '); '
          })
        }
      }
    })

    this.state.selectedGrupos.forEach((key, value) => {
      if (key === true) {
        value = parseInt(value, 10)
        // eslint-disable-next-line
        this.state.grupos[value - 1].integrantes.map(integrante => {
          if (!destinatarios.includes(integrante.id)) {
            destinatarios.push(integrante.id)
            // eslint-disable-next-line
            this.state.funcionarios.map(funcionario => {
              if (funcionario.usuario.id === integrante.id)
                contatos = contatos + funcionario.usuario.name + ' (' + funcionario.usuario.email + '); '
            })
          }
        })
      }
    })

    this.setState({ modalContatos: !this.state.modalContatos, contatos, destinatarios })
  }

  toggleModalMessage() {
    this.setState({ modalMessage: !this.state.modalMessage })
  }

  toggleModalDestinatarios() {
    this.setState({ modalDestinatarios: !this.state.modalDestinatarios })
  }

  componentDidMount() {
    this.getGrupos()
    this.getFuncionarios()
  }

  render() {
    console.log(this.state.destinatarios)
    return (
      <div>
        <Form>
          <FormGroup row>
            <Label size="sm" sm="1">Para</Label>
            <Button
              onClick={this.toggleModalContatos.bind(this)}
              size="sm"
              color="link"
            >
              Selecionar/remover contatos
            </Button>
          </FormGroup>

          <FormGroup row>
            <Col sm="1"></Col>
            <Col onClick={() => this.toggleModalDestinatarios()}>
              <Input
                invalid={this.state.destinatariosError}
                bsSize="sm"
                placeholder="Contatos"
                disabled
                value={this.state.contatos}
              />
              <FormFeedback>{this.state.destinatariosError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label size="sm" sm="1">Assunto</Label>
            <Col>
              <Input
                invalid={this.state.assuntoError}
                bsSize="sm"
                placeholder="Digite o assunto"
                onChange={e => this.setState({ assunto: e.target.value })}
                value={this.state.assunto}
              />
              <FormFeedback>{this.state.assuntoError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm="1"></Col>
            <Col>
              <Input
                invalid={this.state.textoError}
                bsSize="sm"
                style={{ height: 150, minHeight: 100, maxHeight: 250 }}
                type="textarea"
                placeholder="Digite a mensagem"
                onChange={e => this.setState({ texto: e.target.value })}
                value={this.state.texto}
              />
              <FormFeedback>{this.state.textoError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm="10"></Col>
            <Col sm="2">
              <Button
                onClick={this.createMessage.bind(this)}
                size="sm"
                color="primary"
                style={{ inlineSize: 100 }}
              >
                {this.state.loading ?
                  <Loader color="#FFF" />
                  : 'Enviar'
                }
              </Button>
            </Col>
          </FormGroup>
        </Form>

        <CommonModal
          isOpen={this.state.modalContatos}
          toggle={this.toggleModalContatos.bind(this)}
          centered
          modalTitle="Selecionar contatos"
          primaryTitle="Ok"
          style={{ maxWidth: '70%' }}
        >
          <FormGroup style={{ marginTop: 10 }}>
            <Label sm="3" size="sm">Selecione os contatos</Label>
            <Col sm="10">
              <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                  {/* // eslint-disable-next-line */}
                  &#128269;
                </InputGroupAddon>
                <Input
                  placeholder="Buscar"
                  onChange={e => this.onSearchChange(e.target.value)}
                  value={this.state.busca}
                />
              </InputGroup>
            </Col>
          </FormGroup>

          <FormGroup style={{ marginTop: 30, fontSize: 14 }}>
            <Label>Grupos:</Label>
            {this.state.loadingTable ?
              <div className="Loading" style={{ height: 150 }}>
                <Loader />
              </div>
              :
              this.state.grupos ?
                <Table
                  size="sm"
                  striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Contatos</th>
                      <th className="Col-Icon"></th>
                    </tr>
                  </thead>

                  <tbody style={{ height: 100 }} className="Scrollable-Table">
                    {this.state.grupos.map(grupo =>
                      <tr key={grupo.id}>
                        <td>{grupo.titulo}</td>
                        <td>
                          {grupo.integrantes.map(integrante =>
                            <React.Fragment>
                              {integrante.name}{' / '}
                            </React.Fragment>
                          )}
                        </td>
                        <td className="Col-Icon">
                          <input
                            type="checkbox"
                            value={grupo.id}
                            checked={this.state.selectedGrupos.get(grupo.id)}
                            onChange={this.handleCheckboxGrupos.bind(this)}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                : <h4 style={{ margin: 10, height: 150 }}>Não foi encontrado nenhum grupo</h4>
            }
          </FormGroup>

          <FormGroup style={{ marginTop: 10, fontSize: 15 }}>
            <Label>Contatos:</Label>
            {this.state.loadingTable ?
              <div className="Loading" style={{ height: 150 }}>
                <Loader />
              </div>
              :
              this.state.funcionarios ?
                <Table
                  size="sm"
                  striped bordered responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th className="Col-Medium">Função</th>
                      <th>Clinica</th>
                      <th className="Col-Icon"></th>
                    </tr>
                  </thead>

                  <tbody style={{ height: 100 }} className="Scrollable-Table">
                    {this.state.funcionarios.map(funcionario =>
                      <tr key={funcionario.id}>
                        <td>{funcionario.usuario.name}</td>
                        <td className="Col-Medium">
                          {funcionario.cargos.map(cargo => <Fragment key={cargo.id}>{cargo.nome}</Fragment>)}
                        </td>
                        <td>{funcionario.clinica}</td>
                        <td className="Col-Icon">
                          <input
                            type="checkbox"
                            value={funcionario.usuario.id}
                            checked={this.state.selectedFuncionarios.get(funcionario.usuario.id)}
                            onChange={this.handleCheckboxContatos.bind(this)}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                : <h4 style={{ margin: 10, height: 150 }}>Não foi encontrado nenhum contato</h4>
            }
          </FormGroup>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalDestinatarios}
          toggle={this.toggleModalDestinatarios.bind(this)}
          modalTitle="Destinatários"
          primaryTitle="Ok"
        >
          {this.state.destinatarios.length > 0 ?
            <Table size="sm" striped bordered responsive>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody className="Scrollable-Modal">
                {this.state.funcionarios.map(funcionario =>
                  this.state.destinatarios.includes(funcionario.usuario.id) ?
                    <tr key={funcionario.id}>
                      <td>{funcionario.usuario.name}</td>
                      <td>{funcionario.usuario.email}</td>
                      <td>
                        {funcionario.cargos.map(cargo => <Fragment key={cargo.id}>{cargo.nome}</Fragment>)}
                      </td>
                    </tr>
                    : null
                )
                }
              </tbody>
            </Table>
            : <h5>Você não selecionou nenhum contato ou grupo</h5>
          }
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalMessage}
          toggle={this.toggleModalMessage.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Enviar mensagem"
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

export default connect(mapStateToProps, {})(CreateMessage)
