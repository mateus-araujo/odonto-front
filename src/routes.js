import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./auth";
import LoginPage from './scenes/LoginPage';
import Home from './scenes/Home';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state:{ from: props.location } }} />
      )
    }
  >

  </Route>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <PrivateRoute path="/app" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;