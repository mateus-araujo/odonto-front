import React, { Component } from 'react'
import {
  Col, CustomInput, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Form, FormFeedback, FormGroup, Label, Input, Table
} from 'reactstrap'
import { FaTrashAlt, FaPencilAlt, FaPlusCircle } from 'react-icons/fa'
import classNames from 'classnames/bind'
import InputMask from 'react-input-mask'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { openCreateEmployee, openCreateRole } from '../../../../store/actions'
import CommonModal from '../../../CommonModal'
import Loader from '../../../Loader'
import api from '../../../../services/api'

class ManageEmployees extends Component {
  state = {
    funcionarios: [],
    message: '',
    loading: false,
    modalDelete: false,
    modalEdit: false,
    modalError: false,
    modalSuccess: false,
    idFuncionario: 0,
    cargos: [],
    nome: '',
    nomeError: '',
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

  async editfuncionario() {
    this.setState({ loading: true })

    const { nome, cpf, email, password, data_nascimento, selectedCargo, clinica, acesso_sistema, idFuncionario } = this.state
    const cargos = []
    cargos.push(selectedCargo.id)

    await api.put(`/funcionarios/${idFuncionario}`, {
      nome,
      cpf,
      email,
      password,
      data_nascimento,
      cargos,
      clinica,
      acesso_sistema
    })
      .then(() => {
        this.setState({ modalSuccess: true, message: "Funcionario editado com sucesso" })
        this.getFuncionarios()
      })
      .catch(({ response }) => {
        console.log(response)

        const { error } = response.data

        this.setState({ modalError: true, message: error })
      })

    this.setState({ loading: false })
  }

  async deletefuncionario() {
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
          <Loader />
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
                      <td>{funcionario.nome}</td>
                      <td className="Col-Large">{funcionario.User.email}</td>
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
                            email: funcionario.User.email,
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
            : <Link to="/management/roles/create" onClick={() => this.props.openCreateRole()}>Cadastre algum cargo para cadastrar funcionários</Link>
          }
        </div>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          togglePrimary={this.deletefuncionario.bind(this)}
          toggleSecondary={() => this.setState({ modalDelete: false })}
          centered
          message="Deseja mesmo excluir o funcionário?"
          modalTitle="Remover funcionário"
          primaryTitle="Sim"
          secondaryTitle="Não"
        />

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
        {this.state.cargos.length ?
          <CommonModal
            isOpen={this.state.modalEdit}
            toggle={this.toggleModalEdit.bind(this)}
            togglePrimary={this.editfuncionario.bind(this)}
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
                    invalid={this.state.nomeError}
                    bsSize="sm"
                    placeholder="Digite o nome do funcionário"
                    onChange={e => this.setState({ nome: e.target.value, nomeError: '' })}
                    value={this.state.nome}
                  />
                  <FormFeedback>{this.state.nomeError}</FormFeedback>
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
                <Label sm="3" size="sm">Senha</Label>
                <Col sm="6">
                  <Input
                    invalid={this.state.passwordError}
                    bsSize="sm"
                    type="password"
                    placeholder="Digite o senha do funcionário"
                    onChange={e => this.setState({ password: e.target.value, passwordError: '' })}
                    value={this.state.password}
                  />
                  <FormFeedback>{this.state.passwordError}</FormFeedback>
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
            </Form>
          </CommonModal>
          : null
        }
      </div>
    )
  }
}

export default connect(null, { openCreateEmployee, openCreateRole })(ManageEmployees)
