import React, { Component } from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import { FaFileArchive, FaTrashAlt } from 'react-icons/fa'
import CommonModal from '../../../CommonModal'
import classNames from 'classnames/bind';
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class MessagesSent extends Component {
  state = {
    list: [
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '3', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { id: '1', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '2', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '3', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '4', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '5', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '6', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '7', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '8', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '9', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '10', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '11', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '12', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '13', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '14', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '15', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '16', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '4', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '6', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '7', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '8', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { id: '1', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '2', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '3', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '4', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '5', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '6', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '7', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '8', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '9', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '10', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '11', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '12', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '13', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '14', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '15', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '16', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '9', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '10', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '11', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '12', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '13', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { id: '1', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '2', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '3', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '4', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '5', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '6', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '7', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '8', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '9', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '10', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '11', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '12', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '13', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '14', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '15', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '16', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '14', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '15', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '16', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '17', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '18', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { id: '1', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '2', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '3', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '4', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '5', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '6', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '7', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '8', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '9', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '10', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '11', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '12', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '13', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '14', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '15', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '16', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '19', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '20', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '21', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '22', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '23', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { id: '1', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '2', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '3', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '4', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '5', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '6', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '7', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '8', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '9', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '10', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '11', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '12', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { id: '13', nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { id: '14', nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { id: '15', nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { id: '16', nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '24', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '25', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' }
    ],
    modalDelete: false,
    modalArchive: false,
    modalList: false,
    viewedList: [],
  }

  toggleModalDelete() {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  toggleModalArchive() {
    this.setState({ modalArchive: !this.state.modalArchive })
  }

  modalVizualizado(message) {
    this.setState({
      modalList: true,
      viewedList: message.vizualizado
    })
  }

  closeModalVizualizado() {
    this.setState({
      modalList: false,
      viewedList: []
    })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <div className="List">
          <Row className="Labels">
            <Col sm="3">Remetente</Col>
            <Col sm="3">Assunto</Col>
            <Col sm={{ size: '1', offset: '2' }}>Vizualização</Col>
            <Col style={{ paddingLeft: 50 }}>Remover/Arquivar</Col>
          </Row>

          <div className="Scrollable">
            {list.map(message => {
              const className = classNames({
                'Message-Item': true,
                'Message-Item-NotRead': message.lida
              })

              return (
                <Row key={message.id} className={className}>
                  <Col sm="3" className="No-Wrap-Ellipsis">{message.remetente}</Col>
                  <Col sm="3" className="No-Wrap-Ellipsis">{message.assunto}</Col>
                  <Col sm="2">{message.data}</Col>
                  <Col sm="2" style={{ paddingLeft: 50 }}>
                    {typeof message.vizualizado === "object" ?
                      <Button
                        style={{ padding: 0 }}
                        size="sm"
                        color="link"
                        onClick={() => this.modalVizualizado(message)}
                      >
                        ver
                      </Button>
                      : message.vizualizado
                    }
                  </Col>
                  <Col sm="2">
                    <Row>
                      <Col sm="5"></Col>
                      <Col sm="1" onClick={this.toggleModalDelete.bind(this)}>
                        <FaTrashAlt color="red" />
                      </Col>
                      <Col sm="1" onClick={this.toggleModalArchive.bind(this)}>
                        <FaFileArchive color="green" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
            }
            )}
          </div>
        </div>

        <CommonModal
          isOpen={this.state.modalDelete}
          toggle={this.toggleModalDelete.bind(this)}
          centered
          message="Deseja mesmo remover esta mensagem?"
          modalTitle="Remover mensagem"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalDelete.bind(this)}
        />

        <CommonModal
          isOpen={this.state.modalArchive}
          toggle={this.toggleModalArchive.bind(this)}
          centered
          message="Deseja mesmo arquivar esta mensagem?"
          modalTitle="Arquivar mensagem"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalArchive.bind(this)}
        />

        <CommonModal
          isOpen={this.state.modalList}
          toggle={this.closeModalVizualizado.bind(this)}
          modalTitle="Vizualização"
          primaryTitle="Ok"
        >
          <Table size="sm" striped bordered responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Função</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="Scrollable-Modal">
              {this.state.viewedList.map(user =>
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.funcao}</td>
                  <td>{user.vizualizado}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CommonModal>
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default MessagesSent