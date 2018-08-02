import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import ResetPasswordForm from '../components/ResetPasswordForm'
import NotFound from '../components/NotFound'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route 
      {...rest} 
      render={props =>
        isAuthenticated ?
          <Component {...props} />
        : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      }
    />
  )
}

const Routes = (props) => (
  <Switch>
    <Route exact path="/" component={() => 
      !props.isAuthenticated ?
        <LoginForm /> 
      : <Redirect to={{ pathname: "/home", state: { from: props.location } }} /> } 
    />
    <Route path="/forgot_password" component={() => <ForgotPasswordForm />} />
    <Route 
      path="/reset_password/:email/:token" 
      component={(props) => <ResetPasswordForm { ...props } />} 
    />
    <PrivateRoute path="/home" component={() => <Home />} isAuthenticated={props.isAuthenticated} />
    <Route component={() => <NotFound />} />
  </Switch>
)

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth

  return { isAuthenticated }
}

export default withRouter(connect(mapStateToProps)(Routes))