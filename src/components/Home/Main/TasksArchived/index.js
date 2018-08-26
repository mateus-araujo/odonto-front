import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FaRecycle, FaTrashAlt } from 'react-icons/fa'
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
            <Col sm={{ size: '2', offset: '3' }} style={{ paddingLeft: 40 }}>Opções</Col>
          </Row>

          <div className="Scrollable">
            {list.map(task => {
              return (
                <Row key={task.id} className="Task-Item">
                  <Col sm="3" className="No-Wrap-Ellipsis">{task.remetente}</Col>
                  <Col sm="3" className="No-Wrap-Ellipsis">{task.assunto}</Col>
                  <Col sm="2">{task.data}</Col>
                  <Col sm="2" style={{ paddingLeft: 80 }}>
                    <Button style={{ margin: 5 }} size="sm" color="info">
                      Ver tarefa
                    </Button>
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
          message="Deseja mesmo remover esta tarefa?"
          modalTitle="Remover tarefa"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalDelete.bind(this)}
        />

        <CommonModal
          isOpen={this.state.modalRestore}
          toggle={this.toggleModalRestore.bind(this)}
          centered
          message="Deseja mesmo restaurar a tarefa para a caixa de entrada?"
          modalTitle="Restaurar tarefa"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalRestore.bind(this)}
        />
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default TasksArchived