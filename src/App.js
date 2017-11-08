import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Features from './pages/Features';
/**
 * Application entry point. 
 */
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/features' component={Features}/>                    
            <Route path='/register' component={Register}/>        
            <Route path='/login' component={Login}/>      
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
