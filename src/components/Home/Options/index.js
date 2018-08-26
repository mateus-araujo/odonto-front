import React, { Component } from 'react'
import { Button, Badge } from 'reactstrap'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import classNames from 'classnames/bind';
import {
  openMessagesInbox, openMessagesSent, openMessagesArchived,
  openTasksInbox, openTasksSent, openTasksArchived, 
  openTrainings
} from '../../../store/actions'

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

    const MessagesInbox = classNames({
      'Item': true,
      'ItemSelected': this.props.messagesInbox
    })

    const MessagesSent = classNames({
      'Item': true,
      'ItemSelected': this.props.messagesSent
    })

    const MessagesArchived = classNames({
      'Item': true,
      'ItemSelected': this.props.messagesArchived
    })

    const TasksInbox = classNames({
      'Item': true,
      'ItemSelected': this.props.tasksInbox
    })

    const TasksSent = classNames({
      'Item': true,
      'ItemSelected': this.props.tasksSent
    })

    const TasksArchived = classNames({
      'Item': true,
      'ItemSelected': this.props.tasksArchived
    })

    const Trainings = classNames({
      'Item': true,
      'ItemSelected': this.props.trainings
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
              <div className={MessagesInbox} onClick={() => this.props.openMessagesInbox()}>
                <span>Caixa de entrada</span>
                <Badge color="light">(2)</Badge>
              </div>

              <div className={MessagesSent} onClick={() => this.props.openMessagesSent()}>
                Enviadas
              </div>

              <div className={MessagesArchived} onClick={() => this.props.openMessagesArchived()}>
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
              <div className={TasksInbox} onClick={() => this.props.openTasksInbox()}>
                <span>Caixa de entrada</span>
                <Badge color="light">(2)</Badge>
              </div>

              <div className={TasksSent} onClick={() => this.props.openTasksSent()}>
                <span>Enviadas</span>
                <Badge color="light">(2)</Badge>
              </div>

              <div className={TasksArchived} onClick={() => this.props.openTasksArchived()}>
                Arquivadas
              </div>
            </div>
            : null
          }
        </div>

        <div className="Option">
          <div className={Trainings} onClick={() => this.props.openTrainings()}>
            <span>Treinamentos</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ main }) => {
  const { messagesInbox, messagesSent, messagesArchived, tasksInbox, tasksArchived, trainings } = main

  return { messagesInbox, messagesSent, messagesArchived, tasksInbox, tasksArchived, trainings }
}

export default withRouter(connect(mapStateToProps, {
  openMessagesInbox, openMessagesSent, openMessagesArchived,
  openTasksInbox, openTasksSent, openTasksArchived, openTrainings
})(Options))