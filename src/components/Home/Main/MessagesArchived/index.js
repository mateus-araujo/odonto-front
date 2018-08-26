import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import { FaRecycle, FaTrashAlt } from 'react-icons/fa'
import classNames from 'classnames/bind';
import CommonModal from '../../../CommonModal'
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class MessagesInbox extends Component {
  state = {
    list: [
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', lida: true },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', lida: true },
      { id: '3', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', lida: false },
      { id: '4', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', lida: false },
    ],
    modalDelete: false,
    modalRestore: false,
  }

  toggleModalDelete() {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  toggleModalRestore() {
    this.setState({ modalRestore: !this.state.modalRestore })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <div className="List">
          <Row className="Labels">
            <Col sm="3">Remetente</Col>
            <Col sm="4">Assunto</Col>
            <Col sm={{ size: '3', offset: '2' }} style={{ paddingLeft: 50 }}>Remover/Restaurar</Col>
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
                  <Col sm="4" className="No-Wrap-Ellipsis">{message.assunto}</Col>
                  <Col sm="3">
                    {message.data + ' | '}
                    {message.hora}
                  </Col>
                  <Col sm="2">
                    <Row>
                      <Col sm="5"></Col>
                      <Col sm="2" onClick={this.toggleModalDelete.bind(this)}>
                        <FaTrashAlt color="red" />
                      </Col>
                      <Col sm="2" onClick={this.toggleModalRestore.bind(this)}>
                        <FaRecycle color="green" />
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
          isOpen={this.state.modalRestore}
          toggle={this.toggleModalRestore.bind(this)}
          centered
          message="Deseja mesmo restaurar a mensagem para a caixa de entrada?"
          modalTitle="Restaurar mensagem"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalRestore.bind(this)}
        />
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default MessagesInbox