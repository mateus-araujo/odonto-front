import React, { Component } from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import { FaFileArchive } from 'react-icons/fa'
import CommonModal from '../../CommonModal'
import classNames from 'classnames/bind';
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class MessagesSent extends Component {
  state = {
    modal: false,
    modalList: false,
    viewedList: [],
    list: [
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '3', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '4', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '3', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '4', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '3', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '4', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '3', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '4', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' },
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', vizualizado: 'Lido' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', vizualizado: 'Lido' },
      {
        id: '3', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00',
        vizualizado: [
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
          { nome: 'Rafael Lemos', funcao: 'Vigia Noturno', vizualizado: 'Lido' },
          { nome: 'Tadeu', funcao: 'Administrador', vizualizado: 'Lido' },
          { nome: 'Mariah Clara', funcao: 'Dentista', vizualizado: 'Não lido' },
          { nome: 'Ederson Betiol', funcao: 'RH', vizualizado: 'Não lido' },
        ]
      },
      { id: '4', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', vizualizado: 'Não lido' },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', vizualizado: 'Não lido' }
    ]
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  modalVizualizado(message) {
    this.setState({
      modalList: true,
      viewedList: message.vizualizado
    })

    console.log(this.state.viewedList)
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
            <Col sm={{ size: '2', offset: '2' }}>Vizualizado</Col>
            <Col sm="2">Arquivar</Col>
          </Row>

          <div className="Scrollable">
            {list.map(message => {
              const className = classNames({
                'Message-Item': true,
                'Message-Item-NotRead': message.lida
              })

              return (
                <div>
                  <Row key={message.id} className={className}>
                    <Col sm="3">{message.remetente}</Col>
                    <Col sm="4">{message.assunto}</Col>
                    <Col sm="2">{message.data}</Col>
                    <Col sm="2">
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
                    <Col sm="1"
                      onClick={this.toggleModal.bind(this)}
                    >
                      <FaFileArchive color="green" />
                    </Col>
                  </Row>
                </div>
              )
            }
            )}
          </div>
        </div>

        <CommonModal
          isOpen={this.state.modal}
          toggle={this.toggleModal.bind(this)}
          centered
          message="Deseja mesmo arquivar a mensagem?"
          modalTitle="Arquivar mensagem"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModal.bind(this)}
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
                <tr>
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