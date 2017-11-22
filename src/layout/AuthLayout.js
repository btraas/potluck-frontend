import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

/**
 * Authentication required pages.
 */
class AuthLayout extends Component {

  render() {
    return (
        <Switch>
            <Route path="/" component={Dashboard} />
        </Switch>
    );
  }
}

export default AuthLayout;

