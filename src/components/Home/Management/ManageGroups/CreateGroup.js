import React, { Component, Fragment } from 'react'
import {
  Button, Col, Form, FormFeedback, FormGroup, Label, Input, InputGroup, InputGroupAddon, Table
} from 'reactstrap'
import validator from 'validator'
import { connect } from 'react-redux'
import _ from 'lodash'

import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class CreateGroup extends Component {
  state = {
    funcionarios: [],
    titulo: '',
    tituloError: '',
    fundadorId: '',
    integrantes: new Map(),
    integrantesError: '',
    selectedUser: '',
    busca: '',
    loading: false,
    loadingTable: true,
    message: '',
    modal: false,
  }

  constructor(props) {
    super(props)

    this.search = _.debounce(this.search, 500)
    this.componentDidMount =  _.debounce(this.componentDidMount, 300)
    this.baseState = this.state
  }

  toggleModal() {
    this.setState(this.baseState)
    this.getFuncionarios()
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.titulo)) {
      isError = true
      this.setState({ tituloError: "Nome do grupo não pode estar vazio" })
    }

    return isError
  }

  async createGroup() {
    const error = this.validate()

    let vector = this.state.integrantes
    let integrantes = []

    vector.forEach((key, value) => {
      if (key === true)
        integrantes.push(value)
    })

    if (!integrantes.length)
      this.setState({ modal: true, message: "Você deve adicionar integrantes no grupo" })

    let fundadorId = this.props.user.id

    if (!error && integrantes.length) {
      this.setState({ loading: true })

      const { titulo } = this.state

      await api.post(`/grupos`, {
        titulo,
        fundadorId,
        integrantes
      })
        .then(() => {
          this.setState({ modal: true, message: "Grupo criado com sucesso" })
          this.getFuncionarios()
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modal: true, message: error })
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

  async search() {
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

    this.search()
  }

  handleCheckbox(e) {
    const integrante = e.target.value;
    const selected = e.target.checked;
    this.setState(prevState => ({ integrantes: prevState.integrantes.set(integrante, selected) }));
  }

  componentDidMount() {
    this.getFuncionarios()
  }

  render() {
    return (
      <div>
        <Form style={{ marginTop: 10 }}>
          <FormGroup row>
            <Label sm="2" size="sm">Nome do grupo</Label>
            <Col sm="8">
              <Input
                invalid={this.state.tituloError}
                bsSize="sm"
                placeholder="Digite o nome do grupo"
                onChange={e => this.setState({ titulo: e.target.value, tituloError: '' })}
                value={this.state.titulo}
              />
              <FormFeedback>{this.state.tituloError}</FormFeedback>
            </Col>
          </FormGroup>

          <FormGroup style={{ margin: -16, marginTop: 10 }}>
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


          <FormGroup style={{ marginTop: 30, fontSize: 15 }}>
            {this.state.loadingTable ?
              <div className="Loading" style={{ height: 250 }}>
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
                      <th className="Col-Large">Email</th>
                      <th className="Col-Medium">Função</th>
                      <th>Clinica</th>
                      <th className="Col-Icon"></th>
                    </tr>
                  </thead>

                  <tbody style={{ height: 200 }} className="Scrollable-Table">
                    {this.state.funcionarios.map(funcionario =>
                      <tr key={funcionario.id}>
                        <td>{funcionario.usuario.name}</td>
                        <td className="Col-Large">{funcionario.usuario.email}</td>
                        <td className="Col-Medium">
                          {funcionario.cargos.map(cargo => <Fragment key={cargo.id}>{cargo.nome}</Fragment>)}
                        </td>
                        <td>{funcionario.clinica}</td>
                        <td className="Col-Icon">
                          <input
                            type="checkbox"
                            value={funcionario.usuario.id}
                            checked={this.state.integrantes.get(funcionario.usuario.id)}
                            onChange={this.handleCheckbox.bind(this)}
                          />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                : <h4 style={{ margin: 10, height: 250 }}>Não foi encontrado nenhum funcionário</h4>
            }
          </FormGroup>

          <FormGroup row>
            <Col sm="10"></Col>
            <Col sm="2">
              <Button
                size="sm"
                color="primary"
                style={{ inlineSize: 100 }}
                onClick={() => this.createGroup()}
              >
                {this.state.loading ?
                  <Loader color="#FFF" />
                  : <div>Adicionar</div>}
              </Button>
            </Col>
          </FormGroup>
        </Form>

        <CommonModal
          isOpen={this.state.modal}
          toggle={this.toggleModal.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Criar grupo"
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

export default connect(mapStateToProps, {})(CreateGroup)
