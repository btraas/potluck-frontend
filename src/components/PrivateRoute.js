import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => 
    ( <Route {...rest} render={(routeProps) => 
        rest.isAuthenticated ? <Component {...rest} {...routeProps}/> : 
        <Redirect to={{pathname: '/login', state: { from: routeProps.location }}}/>
    }/>)
  
export default PrivateRoute