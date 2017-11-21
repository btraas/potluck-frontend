import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import PrivateRoute from './components/PrivateRoute';
import AuthLayout from './layout/AuthLayout';
import NoAuthLayout from './layout/NoAuthLayout';

/**
 * Application entry point. 
 */
class App extends Component {

  render() {
    const isAuthenticated = true; //TODO auth token check here
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <PrivateRoute isAuthenticated={isAuthenticated} path='/dashboard' component={AuthLayout} />                         
            <Route path="/" component={NoAuthLayout}/>  
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
