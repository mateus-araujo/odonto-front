import React, { Component } from 'react'
import {
  Col, CustomInput, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Form, FormFeedback, FormGroup, Label, Input, Table
} from 'reactstrap'
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa'
import classNames from 'classnames/bind'
import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import validator from 'validator'
import moment from 'moment'
import { connect } from 'react-redux'

import { openCreateEmployee, openCreateRole } from '../../../../store/actions'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class ManageEmployees extends Component {
  state = {
    funcionarios: [],
    message: '',
    loading: true,
    modalDelete: false,
    modalEdit: false,
    modalError: false,
    modalSuccess: false,
    idFuncionario: 0,
    cargos: [],
    name: '',
    nameError: '',
    cpf: '',
    cpfError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: [],
    data_nascimento: '',
    data_nascimentoError: '',
    selectedCargo: [],
    cargoError: '',
    clinica: '',
    clinicaError: '',
    acesso_sistema: false,
  }

  constructor(props) {
    super(props)

    this.componentDidMount = _.debounce(this.componentDidMount, 300)
  }

  async getCargos() {
    this.setState({ loading: true })

    await api.get('/cargos')
      .then(response => {
        const { cargos } = response.data

        this.setState({ cargos, selectedCargo: cargos[0] })
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data
        this.setState({ error })
      })

    this.setState({ loading: false })
  }

  validaCPF(c) {
    if ((c = c.replace(/[^\d]/g, "")).length !== 11)
      return false;

    if (c === "00000000000")
      return false;

    var r;
    var s = 0;

    for (let i = 1; i <= 9; i++)
      s = s + parseInt(c[i - 1], 10) * (11 - i);

    r = (s * 10) % 11;

    if ((r === 10) || (r === 11))
      r = 0;

    if (r !== parseInt(c[9], 10))
      return false;

    s = 0;

    for (let i = 1; i <= 10; i++)
      s = s + parseInt(c[i - 1], 10) * (12 - i);

    r = (s * 10) % 11;

    if ((r === 10) || (r === 11))
      r = 0;

    if (r !== parseInt(c[10], 10))
      return false;

    return true;
  }

  validate = () => {
    let isError = false

    if (validator.isEmpty(this.state.name)) {
      isError = true
      this.setState({ nameError: "Nome não pode estar vazio" })
    }

    if (!this.validaCPF(this.state.cpf)) {
      isError = true
      this.setState({ cpfError: "CPF precisa ser válido" })
    }

    const data_nascimento = moment(this.state.data_nascimento, 'DD/MM/YYYY').format('MM/DD/YYYY')

    if (!validator.toDate(data_nascimento)) {
      isError = true
      this.setState({ data_nascimentoError: "Data de nascimento precisa ser válida" })
    }

    if (!validator.isEmail(this.state.email)) {
      isError = true
      this.setState({ emailError: "Email precisa ser válido" })
    }

    if (validator.isEmpty(this.state.clinica)) {
      isError = true
      this.setState({ clinicaError: "Clínica não pode estar vazia" })
    }

    return isError
  }

  async editFuncionario() {
    const error = this.validate()

    if (!error) {
      this.setState({ loading: true })

      const { name, cpf, email, data_nascimento, selectedCargo, clinica, acesso_sistema, idFuncionario } = this.state
      const cargos = []
      cargos.push(selectedCargo.id)

      await api.put(`/funcionarios/${idFuncionario}`, {
        name,
        cpf,
        data_nascimento,
        email,
        cargos,
        clinica,
        acesso_sistema
      })
        .then(() => {
          this.setState({ modalSuccess: true, message: "Funcionário editado com sucesso" })
          this.getFuncionarios()
        })
        .catch(({ response }) => {
          console.log(response)

          const { error } = response.data

          this.setState({ modalError: true, message: error })
        })

      this.setState({ loading: false })
    }
  }

  async deleteFuncionario() {
    this.setState({ loading: true })

    const { idFuncionario } = this.state

    await api.delete(`/funcionarios/${idFuncionario}`)
      .then(() => {
        this.setState({ modalDelete: false })
        this.getFuncionarios()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loading: false })
  }

  async getFuncionarios() {
    this.setState({ loading: true })

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

    this.setState({ loading: false })
  }

  componentDidMount() {
    this.getCargos()
    this.getFuncionarios()
  }

  toggleDropdown() {
    this.setState({ dropdown: !this.state.dropdown })
  }

  toggleModalEdit() {
    this.setState({ modalEdit: false })
  }

  toggleModalDelete() {
    this.setState({ modalDelete: false })
  }

  toggleModalError() {
    this.setState({ modalError: false })
  }

  toggleModalSuccess() {
    this.setState({ modalSuccess: false, modalEdit: false })
  }

  render() {
    const FormControlCpf = classNames({
      'form-control': true,
      'form-control-sm': true,
      'is-invalid': this.state.cpfError
    })

    const FormControlData = classNames({
      'form-control': true,
      'form-control-sm': true,
      'is-invalid': this.state.data_nascimentoError
    })

    return (
      <div>
        {this.state.loading ?
          <div className="Loading">
            <Loader />
          </div>
          :
          <div>
            {this.state.funcionarios.length ?
              <Table size="sm" striped bordered responsive>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th className="Col-Large">Email</th>
                    <th className="Col-Medium">Função</th>
                    <th>Clinica</th>
                    <th>Acesso ao sistema</th>
                    <th className="Col-Icon"></th>
                    <th className="Col-Icon"></th>
                  </tr>
                </thead>

                <tbody className="Scrollable-Table">
                  {this.state.funcionarios.map(funcionario =>
                    <tr key={funcionario.id}>
                      <td>{funcionario.usuario.name}</td>
                      <td className="Col-Large">{funcionario.usuario.email}</td>
                      <td className="Col-Medium">
                        {funcionario.cargos.map(cargo => <div>{cargo.nome}</div>)}
                      </td>
                      <td>{funcionario.clinica}</td>
                      <td>
                        {funcionario.acesso_sistema ? <div>Sim</div> : <div>Não</div>}
                      </td>
                      <td className="Col-Icon">
                        <FaPencilAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({
                            modalEdit: true,
                            idFuncionario: funcionario.id,
                            selectedCargo: funcionario.cargos[0],
                            name: funcionario.usuario.name,
                            email: funcionario.usuario.email,
                            ...funcionario
                          })}
                          color="orange"
                        />
                      </td>
                      <td className="Col-Icon">
                        <FaTrashAlt
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.setState({ modalDelete: true, idFuncionario: funcionario.id })}
                          color="red"
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              : <h3 style={{ margin: 10 }}>Não há nenhum funcionário cadastrado</h3>
            }
          </div>
        }

        <div className="Create-Button">
          {this.state.cargos.length ?
            <div onClick={() => this.props.openCreateEmployee()}>
              Cadastrar{' '}
              <FaPlusCircle color="green" size="1.8em" />
            </div>
            :
            !this.state.loading ?
              <Link
                to="/management/roles/create"
                onClick={() => this.props.openCreateRole()}>
                Cadastre algum cargo para cadastrar funcionários
              </Link>
              :
              null
          }
        </div>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deleteFuncionario.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          modalTitle="Remover funcionário"
          primaryTitle="Sim"
          secondaryTitle="Não"
        >
          <div>
            Deseja mesmo excluir o funcionário?

            {this.state.loading ?
              <div className="Loading">
                <Loader />
              </div>
              : null
            }
          </div>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalError}
          toggle={this.toggleModalError.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Erro ao remover funcionário"
          primaryTitle="Ok"
        />

        <CommonModal
          isOpen={this.state.modalSuccess}
          toggle={this.toggleModalSuccess.bind(this)}
          centered
          message={this.state.message}
          modalTitle="Editar funcionário"
          primaryTitle="Ok"
        />
        {
          this.state.cargos.length ?
            <CommonModal
              isOpen={this.state.modalEdit}
              toggle={this.toggleModalEdit.bind(this)}
              togglePrimary={this.editFuncionario.bind(this)}
              toggleSecondary={this.toggleModalEdit.bind(this)}
              centered
              modalTitle="Editar funcionário"
              primaryTitle="Salvar"
              secondaryTitle="Cancelar"
            >
              <Form style={{ marginTop: 30 }}>
                <FormGroup row>
                  <Label sm="3" size="sm">Nome</Label>
                  <Col sm="6">
                    <Input
                      invalid={this.state.nameError}
                      bsSize="sm"
                      placeholder="Digite o nome do funcionário"
                      onChange={e => this.setState({ name: e.target.value, nameError: '' })}
                      value={this.state.name}
                    />
                    <FormFeedback>{this.state.nameError}</FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3" size="sm">CPF</Label>
                  <Col sm="6">
                    <InputMask
                      required
                      className={FormControlCpf}
                      mask="999.999.999-99"
                      bsSize="sm"
                      placeholder="Digite o cpf do funcionário"
                      onChange={e => this.setState({ cpf: e.target.value, cpfError: '' })}
                      value={this.state.cpf}
                    />
                    <div class="invalid-feedback">{this.state.cpfError}</div>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3" size="sm">Data de nasc.</Label>
                  <Col sm="6">
                    <InputMask
                      className={FormControlData}
                      mask="99/99/9999"
                      placeholder="Digite a data de nascimento do funcionário"
                      onChange={e => this.setState({ data_nascimento: e.target.value, data_nascimentoError: '' })}
                      value={this.state.data_nascimento}
                    />
                    <div class="invalid-feedback">
                      {this.state.data_nascimentoError}
                    </div>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3" size="sm">Email</Label>
                  <Col sm="6">
                    <Input
                      invalid={this.state.emailError}
                      bsSize="sm"
                      type="email"
                      placeholder="Digite o email do funcionário"
                      onChange={e => this.setState({ email: e.target.value, emailError: '' })}
                      value={this.state.email}
                    />
                    <FormFeedback>{this.state.emailError}</FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3" size="sm">Cargo</Label>
                  <Col sm="6">
                    <Dropdown isOpen={this.state.dropdown} toggle={this.toggleDropdown.bind(this)} size="sm">
                      <DropdownToggle caret style={{ inlineSize: 150 }}>
                        {this.state.selectedCargo.nome}
                      </DropdownToggle>
                      <DropdownMenu>
                        {this.state.cargos.map(cargo =>
                          <DropdownItem
                            onClick={() => this.setState({ selectedCargo: cargo })}
                          >
                            {cargo.nome}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label sm="3" size="sm">Clínica</Label>
                  <Col sm="6">
                    <Input
                      invalid={this.state.clinicaError}
                      bsSize="sm"
                      placeholder="Digite o clínica do funcionário"
                      onChange={e => this.setState({ clinica: e.target.value, clinicaError: '' })}
                      value={this.state.clinica}
                    />
                    <FormFeedback>{this.state.clinicaError}</FormFeedback>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col sm="6" style={{ fontSize: 14 }}>
                    <CustomInput
                      checked={this.state.acesso_sistema}
                      onChange={e => this.setState({ acesso_sistema: e.target.checked })}
                      type="checkbox" id="acesso_sistema" label="Acesso ao sistema"
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  {this.state.loading ?
                    <div className="Loading">
                      <Loader />
                    </div>
                    : null
                  }
                </FormGroup>
              </Form>
            </CommonModal>
            : null
        }
      </div >
    )
  }
}

export default connect(null, { openCreateEmployee, openCreateRole })(ManageEmployees)
