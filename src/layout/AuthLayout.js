import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import EventCreate from '../pages/resources/events/EventCreate';
import EventPage from '../pages/resources/events/EventPage';
/**
 * Authentication required pages.
 */
class AuthLayout extends Component {

  render() {
    return (
        <Switch>
            <Route path="/dashboard/events/create" component={EventCreate}/>
            <Route path="/dashboard/events/:eventId" component={EventPage}/>
            <Route path="/dashboard" component={Dashboard} />
        </Switch>
    );
  }
}

export default AuthLayout;

