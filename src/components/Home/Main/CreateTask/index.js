import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupAddon, Label, Table } from 'reactstrap'
import InputMask from 'react-input-mask'
import classNames from 'classnames/bind'
import validator from 'validator'
import moment from 'moment'
import { connect } from 'react-redux'

import api from '../../../../services/api'
import Loader from '../../../Loader'
import CommonModal from '../../../CommonModal'

class CreateTask extends Component {
  state = {
    contato: '',
    destinatario: {},
    destinatarioId: 0,
    destinatarioError: '',
    assunto: '',
    assuntoError: '',
    prazo: '',
    prazoError: '',
    texto: '',
    textoError: '',
    modalDestinatarios: '',
    modalMessage: '',
    loading: false,
    loadingTable: false,
    busca: '',
    funcionarios: [],
    selectedFuncionario: {}
  }

  constructor(props) {
    super(props)

    this.searchFuncionarios = _.debounce(this.searchFuncionarios, 300)
    this.componentDidMount = _.debounce(this.componentDidMount, 300)
    this.baseState = this.state
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.assunto)) {
      isError = true
      this.setState({ assuntoError: "Assunto da tarefa não pode estar vazio" })
    }

    const prazo = moment(this.state.prazo, 'DD/MM/YYYY').format('MM/DD/YYYY')

    if (!validator.isAfter(prazo)) {
      isError = true
      this.setState({ prazoError: "A data precisa ser posterior a atual" })

      if (!validator.toDate(prazo))
        this.setState({ prazoError: "Prazo da tarefa inválido" })
      if (validator.isEmpty(this.state.prazo))
        this.setState({ prazoError: "Prazo da tarefa não pode estar vazio" })
    }

    if (validator.isEmpty(this.state.texto)) {
      isError = true
      this.setState({ textoError: "Descrição da tarefa não pode estar vazia" })
    }

    return isError
  }

  async createTarefa() {
    const error = this.validate()

    if (!this.state.destinatarioId)
      this.setState({ destinatarioError: "Selecione algum contato acima" })

    const remetenteId = this.props.user.id

    if (!error && this.state.destinatarioId > 0) {
      this.setState({ loading: true })

      const { assunto, prazo, texto, destinatarioId } = this.state

      await api.post(`/tarefas`, {
        assunto,
        prazo,
        texto,
        remetenteId,
        destinatarioId
      })
        .then(() => {
          this.setState({ modalMessage: true, message: "Tarefa enviada" })
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

    this.searchFuncionarios()
  }

  toggleModalContatos() {
    const { id, name, email } = this.state.destinatario

    if (this.state.destinatario.id !== undefined)
      this.setState({
        contato: name + ' (' + email + ');',
        destinatarioId: id,
        modalContatos: !this.state.modalContatos
      })
    else
      this.setState({ modalContatos: !this.state.modalContatos })
  }

  toggleModalMessage() {
    this.setState(this.baseState)
  }

  toggleModalDestinatarios() {
    this.setState({ modalDestinatarios: !this.state.modalDestinatarios })
  }

  componentDidMount() {
    this.getFuncionarios()
  }

  render() {
    console.log(this.state)

    const FormControlPrazo = classNames({
      'form-control': true,
      'form-control-sm': true,
      'is-invalid': this.state.prazoError
    })

    return (
      <div>
        <Form>
          <FormGroup row>
            <Label size="sm" sm="1">Para</Label>
            <Button
              onClick={() => this.setState({ modalContatos: true })}
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
                invalid={this.state.destinatarioError}
                bsSize="sm"
                placeholder="Contato"
                disabled
                value={this.state.contato}
              />
              <FormFeedback>{this.state.destinatarioError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label size="sm" sm="1">Assunto</Label>
            <Col>
              <Input
                invalid={this.state.assuntoError}
                bsSize="sm"
                placeholder="Digite o assunto"
                onChange={e => this.setState({ assunto: e.target.value, assuntoError: '' })}
                value={this.state.assunto}
              />
              <FormFeedback>{this.state.assuntoError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm="1" size="sm">Prazo</Label>
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
            <Col sm="1"></Col>
            <Col>
              <Input
                invalid={this.state.textoError}
                bsSize="sm"
                style={{ height: 120, minHeight: 80, maxHeight: 120 }}
                type="textarea"
                placeholder="Digite a mensagem"
                onChange={e => this.setState({ texto: e.target.value, textoError: '' })}
                value={this.state.texto}
              />
              <FormFeedback>{this.state.textoError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm="10"></Col>
            <Col sm="2">
              <Button
                onClick={this.createTarefa.bind(this)}
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
          modalTitle="Seleciona contato"
          primaryTitle="Ok"
          style={{ maxWidth: '60%' }}
        >
          <FormGroup style={{ marginTop: 10 }}>
            <Label sm="3" size="sm">Selecione o contato</Label>
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

          <FormGroup style={{ marginTop: 10, fontSize: 15 }}>
            <Label>Contatos:</Label>
            {this.state.loadingTable ?
              <div className="Loading" style={{ height: 248 }}>
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

                  <tbody style={{ height: 200 }} className="Scrollable-Table">
                    {this.state.funcionarios.map(funcionario =>
                      <tr key={funcionario.id}>
                        <td>{funcionario.usuario.name}</td>
                        <td className="Col-Medium">
                          {funcionario.cargos.map(cargo => <Fragment key={cargo.id}>{cargo.nome}</Fragment>)}
                        </td>
                        <td>{funcionario.clinica}</td>
                        <td className="Col-Icon">
                          <input
                            type="radio"
                            name="destinatario"
                            value={funcionario.usuario.id}
                            onChange={() => this.setState({ destinatario: funcionario.usuario })}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                : <h4 style={{ margin: 10, height: 238 }}>Não foi encontrado nenhum contato</h4>
            }
          </FormGroup>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalMessage}
          toggle={this.toggleModalMessage.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Enviar tarefa"
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

export default connect(mapStateToProps, {})(CreateTask)
