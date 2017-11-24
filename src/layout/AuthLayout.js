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
            <Route exact path="/dashboard/events/create" render={()=><EventCreate {...this.props}/> }/>
            <Route exact path="/dashboard/events/:eventId" render={()=><EventPage {...this.props}/>}/>
            <Route path="/" render={()=><Dashboard {...this.props}/>} />         
        </Switch>
    );
  }
}

export default AuthLayout;

