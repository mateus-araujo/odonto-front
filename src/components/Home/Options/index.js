import React, { Component } from 'react'
import { Button, Badge } from 'reactstrap'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import classNames from 'classnames/bind';
import {
  openMessagesInbox, openMessagesSent, openMessagesArchived,
  openTasksInbox, openTasksArchived, openTrainings
} from '../../../store/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import './styles.css'

class Options extends Component {
  state = {
    messagesOpen: true,
    tasksOpen: true,
  }

  render() {
    const MessagesTitle = classNames({
      'Title': true,
      'TitleSelected': this.state.messagesOpen
    })

    const TasksTitle = classNames({
      'Title': true,
      'TitleSelected': this.state.tasksOpen
    })

    return (
      <div className="Options">
        <Button color="secondary" size="sm" block>Escrever mensagem</Button>

        <div className="Option">
          <div className={MessagesTitle} onClick={() => this.setState({ messagesOpen: !this.state.messagesOpen })}>
            <span>Mensagens</span>
            <span className="Icon">
              {this.state.messagesOpen ?
                <FaAngleDown />
                : <FaAngleRight />
              }
            </span>
          </div>

          {this.state.messagesOpen ?
            <div className="Items">
              <div className="Item" onClick={() => this.props.openMessagesInbox()}>
                <span>Caixa de entrada</span>
                <Badge color="light">(2)</Badge>
              </div>
              <div className="Item" onClick={() => this.props.openMessagesSent()}>
                Enviadas
              </div>
              <div className="Item" onClick={() => this.props.openMessagesArchived()}>
                Arquivadas
              </div>
            </div>
            : null
          }
        </div>

        <div className="Option">
          <div className={TasksTitle} onClick={() => this.setState({ tasksOpen: !this.state.tasksOpen })}>
            <span>Tarefas</span>
            <span className="Icon">
              {this.state.tasksOpen ?
                <FaAngleDown />
                : <FaAngleRight />
              }
            </span>
          </div>

          {this.state.tasksOpen ?
            <div className="Items">
              <div className="Item" onClick={() => this.props.openTasksInbox()}>
                <span>Caixa de entrada</span>
                <Badge color="light">(2)</Badge>
              </div>
              <div className="Item" onClick={() => this.props.openTasksArchived()}>
                Arquivadas
              </div>
            </div>
            : null
          }
        </div>

        <div className="Option">
          <div className="Item" onClick={() => this.props.openTrainings()}>
            <span>Treinamentos</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, {
  openMessagesInbox, openMessagesSent, openMessagesArchived,
  openTasksInbox, openTasksArchived, openTrainings
})(Options))