import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'
import { FaFileArchive, FaTrashAlt } from 'react-icons/fa'
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
    ],
    modalDelete: false,
    modalArchive: false,
  }

  toggleModalDelete() {
    this.setState({ modalDelete: !this.state.modalDelete })
  }

  toggleModalArchive() {
    this.setState({ modalArchive: !this.state.modalArchive })
  }

  renderStatusButton(task) {
    if (task.status === "Finalizar")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="success">
          Finalizar
        </Button>
      )
    else if (task.status === "Executar")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="primary">
          Executar
        </Button>
      )
    else if (task.status === "Aguardando...")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="warning" disabled>
          Aguardando...
        </Button>
      )
    else if (task.status === "Concluído")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="secondary" disabled>
          Concluído
        </Button>
      )
    else if (task.status === "Não concluído")
      return (
        <Button style={{ margin: 5, inlineSize: 110 }} size="sm" color="danger" disabled>
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
            <Col sm={{ size: '2', offset: '5' }}>Opções</Col>
          </Row>

          <div className="Scrollable">
            {list.map(task => {
              return (
                <Row key={task.id} className="Task-Item">
                  <Col sm="2" className="No-Wrap-Ellipsis">{task.remetente}</Col>
                  <Col className="No-Wrap-Ellipsis">{task.assunto}</Col>
                  <Col sm="2" className="No-Wrap-Ellipsis" style={{ paddingLeft: 30 }}>{task.data}</Col>
                  <Col sm="6" style={{ paddingLeft: 20 }}>
                    <Row>
                      <Col sm="3">
                        <Button style={{ margin: 5 }} size="sm" color="info">
                          Ver tarefa
                        </Button>
                      </Col>

                      <Col>
                        {this.renderStatusButton(task)}
                      </Col>

                      <Col sm="1" style={{ padding: 10 }} onClick={this.toggleModalDelete.bind(this)}>
                        <FaTrashAlt color="red" />
                      </Col>

                      <Col sm="1" style={{ padding: 10, marginRight: 15 }} onClick={this.toggleModalArchive.bind(this)}>
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
          message="Deseja mesmo remover esta tarefa?"
          modalTitle="Remover tarefa"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalDelete.bind(this)}
        />

        <CommonModal
          isOpen={this.state.modalArchive}
          toggle={this.toggleModalArchive.bind(this)}
          centered
          message="Deseja mesmo arquivar esta tarefa?"
          modalTitle="Arquivar tarefa"
          primaryTitle="Sim"
          secondaryTitle="Cancelar"
          toggleSecondary={this.toggleModalArchive.bind(this)}
        />
      </div>
    )
  }
}

// export default withRouter(connect(mapStateToProps, {})(MessagesList))
export default TasksInbox