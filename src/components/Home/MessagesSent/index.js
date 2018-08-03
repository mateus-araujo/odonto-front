import React, { Component } from 'react'
// import { Col, Row } from 'reactstrap'
// import { FaFileArchive } from 'react-icons/fa'
// import classNames from 'classnames/bind';
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class MessagesSent extends Component {
  state = {
    list: [
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', lida: true },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', lida: true },
      { id: '3', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', lida: false },
      { id: '4', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', lida: false },
    ]
  }

  render() {
    // const { list } = this.state
    return (
      <div className="List">
        Messages sent
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default MessagesSent