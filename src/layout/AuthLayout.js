import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Event from '../pages/resources/Event';
/**
 * Authentication required pages.
 */
class AuthLayout extends Component {

  render() {
    return (
        <Switch>
            <Route path="/dashboard/resource/events/:eventId" component={Event}/>
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
  }
}

export default AuthLayout;
