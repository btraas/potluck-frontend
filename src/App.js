import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Navigation from './layout/Navigation';
import Footer from './layout/Footer';
import PrivateRoute from './components/PrivateRoute';
import AuthLayout from './layout/AuthLayout';
import NoAuthLayout from './layout/NoAuthLayout';
import jwt_decode from 'jwt-decode';
import './css/application.css';
/**
 * Application entry point. 
 * Automatically routes to Authenticated Dashboard if user is authenticated.
 */
class App extends Component {
  
  constructor(props) {
    super(props); 
    this.state = {
      accessToken:'',
      idToken:'',
      uid:''
    };
    this.handleToken = this.handleToken.bind(this);    
  }

  componentDidMount() {
    let id = sessionStorage.getItem("id_token");
    let access = sessionStorage.getItem("access_token");
    if(id) {
      try {
        let result = jwt_decode(id);
        this.setState({
          idToken:id,
          accessToken:access,
          uid:result.sub
        });
      } catch (e) {
        console.log(e)
      }
    }
  }

  /**
   * Handler to accept tokens
   * @param {*} e a token is passed to application
   */
  handleToken(e) {
    let decoded = jwt_decode(e.id_token);
    this.setState({
      accessToken:e.access_token,
      idToken:e.id_token,
      uid:decoded.sub
    });            
    sessionStorage.setItem("access_token", e.access_token);
    sessionStorage.setItem("id_token", e.id_token);
    
  }

  render() {
    const {idToken, accessToken, uid} = this.state; 
    const isAuth = idToken ? true:false;
    console.log('auth?', isAuth);
    return (
      <BrowserRouter>
        <div>
          <Navigation isAuthenticated={isAuth} />
          <Switch>
            {isAuth && <PrivateRoute path='/' isAuthenticated={isAuth} access={accessToken} uid={uid} component={AuthLayout} />}                                             
            <Route path="/" render={props=><NoAuthLayout onTokenAccept={this.handleToken} {...props}/>}/>  
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
