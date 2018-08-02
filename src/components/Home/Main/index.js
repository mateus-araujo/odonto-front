import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MessagesList from '../MessagesList'
import TasksInbox from '../TasksInbox'
import { openMessagesInbox } from '../../../store/actions'

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home/messages" component={() => <MessagesList />} />
          <Route path={`${this.props.match.path}/tasks`} component={() => <TasksInbox />} /> 
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(null, { openMessagesInbox })(Main))
