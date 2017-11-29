import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import EventCreate from '../pages/resources/events/EventCreate';
import EventPage from '../pages/resources/events/EventPage';
import EventAddGuest from '../pages/resources/events/EventAddGuest';

/**
 * Authentication required pages.
 */
class AuthLayout extends Component {
  
  render() {
    return (
        <Switch>
            <Route exact path="/dashboard" render={()=><Dashboard {...this.props}/>} />               
            <Route exact path="/dashboard/events/create" render={()=><EventCreate {...this.props}/> }/>
            <Route exact path="/dashboard/events/:eventId" component={EventPage}/>
            <Route exact path="/dashboard/events/:eventId/addguest" component={EventAddGuest}/>
            <Redirect to="/dashboard"/>    
        </Switch>
    );
  }
}

export default AuthLayout;

