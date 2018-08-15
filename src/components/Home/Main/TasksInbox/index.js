import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FaFileArchive } from 'react-icons/fa'
import CommonModal from '../../../CommonModal'
// import classNames from 'classnames/bind';
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class TasksInbox extends Component {
  state = {
    modal: false,
    list: [
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos e aaaaaaaaaaaaaaaaaaaa', data: '12 de Junho', hora: '21:21', status: 'Finalizar', open: true },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', status: 'Executar', open: true },
      { id: '3', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', status: 'Aguardando...', open: false },
      { id: '4', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', status: 'Concluído', open: false },
      { id: '5', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', status: 'Não concluído', open: false },
    ]
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  renderStatusButton(task) {
    if (task.status === "Finalizar")
      return (
        <Button style={{ margin: 5 }} size="sm" color="success">
          Finalizar
        </Button>
      )
    else if (task.status === "Executar")
      return (
        <Button style={{ margin: 5 }} size="sm" color="primary">
          Executar
        </Button>
      )
    else if (task.status === "Aguardando...")
      return (
        <Button style={{ margin: 5 }} size="sm" color="warning" disabled>
          Aguardando...
        </Button>
      )
    else if (task.status === "Concluído")
      return (
        <Button style={{ margin: 5 }} size="sm" color="secondary" disabled>
          Concluído
        </Button>
      )
    else if (task.status === "Não concluído")
      return (
        <Button style={{ margin: 5 }} size="sm" color="danger" disabled>
          Não concluído
        </Button>
      )
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <div className="List">
          <Row className="Labels">
            <Col sm="2">Remetente</Col>
            <Col sm="3">Assunto</Col>
            <Col sm={{ size: '2', offset: '5' }}>Arquivar</Col>
          </Row>

          <div className="Scrollable">
            {list.map(task => {
              return (
                <Row key={task.id} className="Task-Item">
                  <Col sm="2" className="No-Wrap-Ellipsis">{task.remetente}</Col>
                  <Col sm="3" className="No-Wrap-Ellipsis">{task.assunto}</Col>
                  <Col sm="2">{task.data}</Col>
                  <Col sm="2">
                    <Button style={{ margin: 5 }} size="sm" color="info">
                      Ver tarefa
                    </Button>
                  </Col>
                  <Col sm="2">
                    {this.renderStatusButton(task)}
                  </Col>
                  <Col sm="1"
                    onClick={this.toggleModal.bind(this)}
                  >
                    <FaFileArchive color="green" />
                  </Col>
                </Row>
              )
            }
            )}
          </div>
        </div>

        <CommonModal
          isOpen={this.state.modal}
          toggle={this.toggleModal.bind(this)}
          centered
          message="Deseja mesmo arquivar a tarefa?"
          modalTitle="Arquivar tarefa"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModal.bind(this)}
        />
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default TasksInbox