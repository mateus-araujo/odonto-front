import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

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

          <Route path="/management/trainings" component={() => <ManageTrainings />} />
          <Route path="/management/groups" component={() => <ManageGroups />} />

          <Route exact path="/management/employees" component={() => <ManageEmployees />} />
          <Route exact path="/management/employees/create" component={() => <CreateEmployee />} />
          
          <Route exact path="/management/roles" component={() => <ManageRoles />} />
          <Route exact path="/management/roles/create" component={() => <CreateRole />} />
          
          {/* <Route path={`${this.props.match.path}/tasks`} component={() => <TasksInbox />} />  */}
        </Switch>
      </div>
    )
  }
}

export default withRouter(Main)
