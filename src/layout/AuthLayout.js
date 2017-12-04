import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import EventCreate from '../pages/resources/events/EventCreate';
import EventPage from '../pages/resources/events/EventPage';
import EventAddGuest from '../pages/resources/events/EventAddGuest';
import EditEventPledges from '../pages/resources/events/EditEventPledges';
import YourPledges from '../pages/resources/events/YourPledges';

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
            <Route exact path='/dashboard/events/:eventId/editpledges' component={EditEventPledges}/>
            <Route exact path='/dashboard/events/:eventId/:userId/yourpledges' component={YourPledges}/>
            <Redirect to="/dashboard"/>    
        </Switch>
    );
  }
}

export default AuthLayout;

