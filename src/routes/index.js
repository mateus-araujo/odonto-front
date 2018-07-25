import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from '../components/Home'
import LoginForm from '../components/LoginForm'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import NotFound from '../components/NotFound'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated)
  return (
    <Route {...rest} render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <LoginForm />
        )
    }
    />
  )
}

const Routes = (props) => (
  <Switch>
    <Route exact path="/" render={() => (
      !props.isAuthenticated ? (
        <LoginForm />
      ) : (
          <Home />
        )
    )} />
    <Route path="/forgot_password" component={() => <ForgotPasswordForm />} />
    <PrivateRoute path="/home" component={() => <Home />} isAuthenticated={props.isAuthenticated} />
    <Route component={() => <NotFound />} />
  </Switch>
)

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth

  return { isAuthenticated }
}

export default withRouter(connect(mapStateToProps)(Routes))