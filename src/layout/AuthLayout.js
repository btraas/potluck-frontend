import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import EventDetail from '../pages/resources/events/EventDetail';
import EventCreate from '../pages/resources/events/EventCreate';

/**
 * Authentication required pages.
 */
class AuthLayout extends Component {

  render() {
    return (
        <Switch>
            <Route path="/dashboard/events/create" component={EventCreate}/>
            <Route path="/dashboard/events/:eventId" component={EventDetail}/>
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
  }
}

export default AuthLayout;
