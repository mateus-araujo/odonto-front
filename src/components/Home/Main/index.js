import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import CreateMessage from './CreateMessage'
import MessagesInbox from './MessagesInbox'
import MessagesSent from './MessagesSent'
import MessagesArchived from './MessagesArchived'

import TasksInbox from './TasksInbox'
import TasksSent from './TasksSent';
import TasksArchived from './TasksArchived'
import Trainings from './Trainings'

import ManageTrainings from '../Management/ManageTrainings'
import ManageGroups from '../Management/ManageGroups'
import ManageEmployees from '../Management/ManageEmployees'
import ManageRoles from '../Management/ManageRoles'

import CreateRole from '../Management/ManageRoles/CreateRole'
import CreateEmployee from '../Management/ManageEmployees/CreateEmployee';
import CreateGroup from '../Management/ManageGroups/CreateGroup';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/messages/create" component={() => <CreateMessage />} />
          <Route exact path="/" component={() => <MessagesInbox />} />
          <Route path="/messages/sent" component={() => <MessagesSent />} />
          <Route path="/messages/archived" component={() => <MessagesArchived />} />

          <Route exact path="/tasks" component={() => <TasksInbox />} />
          <Route path="/tasks/sent" component={() => <TasksSent />} />
          <Route path="/tasks/archived" component={() => <TasksArchived />} />

          <Route path="/trainings" component={() => <Trainings />} />

          <Route path="/management/trainings" component={() => <ManageTrainings />} />

          <Route exact path="/management/groups" component={() => <ManageGroups />} />
          <Route path="/management/groups/create" component={() => <CreateGroup />} />

          <Route exact path="/management/employees" component={() => <ManageEmployees />} />
          <Route path="/management/employees/create" component={() => <CreateEmployee />} />

          <Route exact path="/management/roles" component={() => <ManageRoles />} />
          <Route path="/management/roles/create" component={() => <CreateRole />} />

          {/* <Route path={`${this.props.match.path}/tasks`} component={() => <TasksInbox />} />  */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(Main)
