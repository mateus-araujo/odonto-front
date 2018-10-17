import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, Label, Table } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import InputMask from 'react-input-mask'
import classNames from 'classnames/bind'
import validator from 'validator'
import moment from 'moment'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import Loader from '../../../Loader'
import CommonModal from '../../../CommonModal'

class CreateEditTraining extends Component {
  state = {
    contatos: '',
    destinatarios: [],
    destinatariosError: '',
    titulo: '',
    tituloError: '',
    url: '',
    urlError: '',
    formulario: '',
    formularioError: '',
    prazo: '',
    prazoError: '',
    modalContatos: false,
    modalDestinatarios: false,
    modalMessage: false,
    modalEdit: false,
    loading: true,
    loadingButton: false,
    loadingTable: false,
    loadingModal: false,
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

    if (validator.isEmpty(this.state.titulo)) {
      isError = true
      this.setState({ tituloError: "Titulo do treinamento não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.url)) {
      isError = true
      this.setState({ urlError: "Endereço não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.formulario)) {
      isError = true
      this.setState({ formularioError: "Endereço não pode estar vazio" })
    }

    const prazo = moment(this.state.prazo, 'DD/MM/YYYY').format('MM/DD/YYYY')

    if (!validator.isAfter(prazo)) {
      isError = true
      this.setState({ prazoError: "A data precisa ser posterior a atual" })

      if (!validator.toDate(prazo))
        this.setState({ prazoError: "Prazo do treinamento inválido" })
      if (validator.isEmpty(this.state.prazo))
        this.setState({ prazoError: "Prazo do treinamento não pode estar vazio" })
    }

    return isError
  }

  async createTreinamento() {
    const error = this.validate()

    if (!this.state.destinatarios.length)
      this.setState({ destinatariosError: "Selecione os contatos acima" })

    let remetenteId = this.props.user.id

    if (!error && this.state.destinatarios.length > 0) {
      this.setState({ loadingButton: true })

      const { titulo, url, formulario, prazo, destinatarios } = this.state

      await api.post(`/treinamentos`, {
        titulo,
        url,
        formulario,
        prazo,
        remetenteId,
        destinatarios
      })
        .then(() => {
          this.setState({ modalMessage: true, message: "Treinamento cadastrado" })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modalMessage: true, message: error })
        })
        .finally(() => {
          this.setState({ loadingButton: false })
        })
    }
  }

  async editTreinamento() {
    const error = this.validate()

    if (!this.state.destinatarios.length)
      this.setState({ destinatariosError: "Selecione os contatos acima" })

    if (!error && this.state.destinatarios.length > 0) {
      this.setState({ loadingButton: true })

      const { titulo, url, formulario, prazo, destinatarios } = this.state
      const { training_id } = this.props.match.params

      await api.put(`/treinamentos/edit/${training_id}`, {
        titulo,
        url,
        formulario,
        prazo,
        destinatarios
      })
        .then(() => {
          this.setState({ modalEdit: true, message: "Treinamento editado" })
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modalEdit: true, message: error })
        })
        .finally(() => {
          this.setState({ loadingButton: false })
        })
    }
  }

  async getTreinamento(training_id) {
    this.setState({ loading: true })

    await api.get(`/treinamentos/${training_id}`)
      .then(response => {
        let { titulo, url, prazo, destinatarios } = response.data.treinamento
        const { formulario } = response.data.treinamento.prova

        let destinatarios_aux = destinatarios
        destinatarios = []
        let contatos = ''

        // eslint-disable-next-line
        destinatarios_aux.map(destinatario => {
          destinatarios.push(destinatario.id)
          contatos = contatos + destinatario.name + ' (' + destinatario.email + '); '
        })

        console.log(destinatarios)

        this.setState({
          titulo, url, prazo,
          formulario, destinatarios, contatos
        })
      })
      .catch(({ response }) => {
        console.log(response)
      })
      .finally(() => {
        this.setState({ loading: false })
      })
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

  async toggleModalContatos() {
    this.setState({ loadingModal: true })

    const { funcionarios, grupos, selectedFuncionarios, selectedGrupos } = this.state

    let destinatarios = []
    let contatos = ''

    selectedFuncionarios.forEach((key, value) => {
      if (key === true) {
        value = Number(value)
        if (!destinatarios.includes(value)) {
          destinatarios.push(value)

          // eslint-disable-next-line
          funcionarios.map(funcionario => {
            if (funcionario.usuario.id === value)
              contatos = contatos + funcionario.usuario.name + ' (' + funcionario.usuario.email + '); '
          })
        }
      }
    })

    selectedGrupos.forEach((key, value) => {
      if (key === true) {
        value = Number(value)
        // eslint-disable-next-line
        grupos[value - 1].integrantes.map(integrante => {
          if (!destinatarios.includes(integrante.id)) {
            destinatarios.push(integrante.id)
            contatos = contatos + integrante.name + ' (' + integrante.email + '); '
          }
        })
      }
    })

    await this.getFuncionarios()

    this.setState({
      modalContatos: false,
      loadingModal: false,
      contatos,
      destinatarios
    })
  }

  toggleModalMessage() {
    this.setState(this.baseState)
  }

  toggleModalEdit() {
    this.setState({ modalEdit: false })
    this.props.history.goBack()
  }

  toggleModalDestinatarios() {
    this.setState({ modalDestinatarios: !this.state.modalDestinatarios })
  }

  componentDidMount() {
    this.getGrupos()
    this.getFuncionarios()

    const { training_id } = this.props.match.params

    if (training_id !== undefined)
      this.getTreinamento(training_id)

    this.setState({ loading: false })
  }

  render() {
    const FormControlPrazo = classNames({
      'form-control': true,
      'form-control-sm': true,
      'is-invalid': this.state.prazoError
    })

    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          <Form>
            <FormGroup row>
              <Label size="sm" sm="3" style={{ marginRight: -40 }}>Para</Label>
              <Button
                onClick={() => this.setState({ modalContatos: true })}
                size="sm"
                color="link"
              >
                Selecionar/remover contatos
            </Button>
            </FormGroup>

            <FormGroup row>
              <Col sm="3" style={{ marginRight: -40 }}></Col>
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
              <Label size="sm" sm="3" style={{ marginRight: -40 }}>Titulo do treinamento</Label>
              <Col>
                <Input
                  invalid={this.state.tituloError}
                  bsSize="sm"
                  placeholder="Digite o titulo"
                  onChange={e => this.setState({ titulo: e.target.value, tituloError: '' })}
                  value={this.state.titulo}
                />
                <FormFeedback>{this.state.tituloError}</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="3" style={{ marginRight: -40 }}>Url do YouTube</Label>
              <Col>
                <Input
                  invalid={this.state.urlError}
                  bsSize="sm"
                  placeholder="Copie e cole o endereço"
                  onChange={e => this.setState({ url: e.target.value, urlError: '' })}
                  value={this.state.url}
                />
                <FormFeedback>{this.state.urlError}</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="3" style={{ marginRight: -40 }}>Link para o formulário</Label>
              <Col>
                <Input
                  invalid={this.state.formularioError}
                  bsSize="sm"
                  placeholder="Copie e cole o endereço"
                  onChange={e => this.setState({ formulario: e.target.value, formularioError: '' })}
                  value={this.state.formulario}
                />
                <FormFeedback>{this.state.formularioError}</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="3" style={{ marginRight: -40 }}>Prazo</Label>
              <Col sm="5">
                <InputMask
                  className={FormControlPrazo}
                  mask="99/99/9999"
                  placeholder="Digite prazo de conclusão"
                  onChange={e => this.setState({ prazo: e.target.value, prazoError: '' })}
                  value={this.state.prazo}
                />
                <div class="invalid-feedback">
                  {this.state.prazoError}
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm="10"></Col>
              <Col sm="2">
                {this.props.match.params.training_id !== undefined ?
                  <Button
                    onClick={this.editTreinamento.bind(this)}
                    size="sm"
                    color="primary"
                    style={{ inlineSize: 100 }}
                  >
                    {this.state.loadingButton ?
                      <Loader color="#FFF" />
                      : 'Salvar'
                    }
                  </Button>
                  :
                  <Button
                    onClick={this.createTreinamento.bind(this)}
                    size="sm"
                    color="primary"
                    style={{ inlineSize: 100 }}
                  >
                    {this.state.loadingButton ?
                      <Loader color="#FFF" />
                      : 'Adicionar'
                    }
                  </Button>
                }
              </Col>
            </FormGroup>
          </Form>
        }

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

          <FormGroup>
            {this.state.loadingModal ?
              <div className="Loading">
                <Loader />
              </div>
              : null
            }
          </FormGroup>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalDestinatarios}
          toggle={this.toggleModalDestinatarios.bind(this)}
          modalTitle="Destinatários"
          primaryTitle="Ok"
          style={{ maxWidth: '70%' }}
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
          modalTitle="Adicionar treinamento"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalEdit}
          toggle={this.toggleModalEdit.bind(this)}
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

export default withRouter(connect(mapStateToProps, {})(CreateEditTraining))
