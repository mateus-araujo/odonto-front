import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FaRecycle } from 'react-icons/fa'
import CommonModal from '../../../CommonModal'
// import { Link, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'

// import './styles.css'

class TasksArchived extends Component {
  state = {
    list: [
      { id: '1', remetente: 'Giovane dos Santos', assunto: 'Entregas dos documentos', data: '12 de Junho', hora: '21:21', status: 'Arquivada' },
      { id: '2', remetente: 'Marco Botton', assunto: 'Semana IV', data: '11 de Junho', hora: '16:00', status: 'Arquivada' },
      { id: '3', remetente: 'Mariah Maclachian', assunto: 'Cursos', data: '09 de Junho', hora: '17:00', status: 'Arquivada' },
      { id: '4', remetente: 'Valerie Liberty', assunto: 'Realização de tarefas', data: '05 de Junho', hora: '22:00', status: 'Arquivada' },
    ]
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    const { list } = this.state
    return (
      <div>
        <div className="List">
          <Row className="Labels">
            <Col sm="3">Remetente</Col>
            <Col sm="4">Assunto</Col>
            <Col sm={{ size: '2', offset: '3' }}>Restaurar</Col>
          </Row>

          <div className="Scrollable">
            {list.map(task => {
              return (
                <Row key={task.id} className="Task-Item">
                  <Col sm="3">{task.remetente}</Col>
                  <Col sm="4">{task.assunto}</Col>
                  <Col sm="2">{task.data}</Col>
                  <Col sm="2">
                    <Button style={{ margin: 5 }} size="sm" color="info">
                      Ver tarefa
                    </Button>
                  </Col>
                  <Col sm="1"
                    onClick={this.toggleModal.bind(this)}
                  >
                    <FaRecycle color="green" />
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
          message="Deseja mesmo restaurar a tarefa para a caixa de entrada?"
          modalTitle="Restaurar tarefa"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModal.bind(this)}
        />
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default TasksArchived