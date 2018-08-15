import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import MessagesInbox from '../MessagesInbox'
import MessagesSent from '../MessagesSent'
import MessagesArchived from '../MessagesArchived'

import TasksInbox from '../TasksInbox'
import TasksSent from '../TasksSent';
import TasksArchived from '../TasksArchived'

import Trainings from '../Trainings'

import { openMessagesInbox } from '../../../store/actions'

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={() => <MessagesInbox />} />
          <Route path="/messages/sent" component={() => <MessagesSent />} />
          <Route path="/messages/archived" component={() => <MessagesArchived />} />

          <Route exact path="/tasks" component={() => <TasksInbox />} />
          <Route path="/tasks/sent" component={() => <TasksSent />} />
          <Route path="/tasks/archived" component={() => <TasksArchived />} />

          <Route path="/trainings" component={() => <Trainings />} />
          
          {/* <Route path={`${this.props.match.path}/tasks`} component={() => <TasksInbox />} />  */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(null, { openMessagesInbox })(Main))
