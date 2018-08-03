import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'
import { FaFileArchive } from 'react-icons/fa'
import classNames from 'classnames/bind';
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
    ]
  }

  render() {
    const { list } = this.state
    return (
      <Container className="List">
        <Row className="Labels">
          <Col sm="3">Remetente</Col>
          <Col sm="4">Assunto</Col>
          <Col sm="2">Data</Col>
          <Col sm="1">Hora</Col>
          <Col sm="2">Arquivar</Col>
        </Row>
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
                <Col sm="2">{message.hora}</Col>
                <Col sm="1"><FaFileArchive color="green" /></Col>
              </Row>
            </div>
          )
        }
        )}
      </Container>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default MessagesInbox