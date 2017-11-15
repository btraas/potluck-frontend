import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

/**
 * Non-authentication required pages.
 */
class NoAuthLayout extends Component {

  render() {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>               
            <Route path='/register' component={Register}/>        
            <Route path='/login' component={Login}/> 
            <Redirect to="/" />     
        </Switch>
    );
  }
}

export default NoAuthLayout;
