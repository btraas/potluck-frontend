import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import EventDetail from '../pages/resources/events/EventDetail';
/**
 * Authentication required pages.
 */
class AuthLayout extends Component {

  render() {
    return (
        <Switch>
            <Route path="/dashboard/resource/events/:eventId" component={EventDetail}/>
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
  }
}

export default AuthLayout;
