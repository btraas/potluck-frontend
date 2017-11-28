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
    let id      = sessionStorage.getItem("id_token");
    let access  = sessionStorage.getItem("access_token");
    let refresh = sessionStorage.getItem("refresh_token");
    
    if(id) {
      try {
        let result = jwt_decode(id);
        this.setState({
          idToken:id,
          accessToken:access,
          uid:result.sub,
          refreshToken:refresh
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
    let access = '';
    let id = '';
    let refresh = '';
    if(e !== '') {
      let decoded = jwt_decode(e.id_token);
      access = e.access_token;
      id = e.id_token;
      refresh = e.refresh_token;
      this.setState({
        accessToken:access,
        idToken:id,
        refreshToken:refresh,
        uid:decoded.sub
      });         
    } else {
      this.setState({
        accessToken:access,
        idToken:id,
      })
    }
    sessionStorage.setItem("access_token", access); //reset if empty token
    sessionStorage.setItem("id_token", id);
    sessionStorage.setItem("refresh_token", refresh);
    
  }

  render() {
    const {idToken, accessToken, uid} = this.state; 
    const isAuth = idToken ? true:false;
    return (
      <BrowserRouter>
        <div>
          <Navigation isAuthenticated={isAuth} onTokenAccept={this.handleToken} access={accessToken}/>
          <Switch>
            {isAuth && <PrivateRoute path='/dashboard' isAuthenticated={isAuth} access={accessToken} uid={uid} component={AuthLayout} />}                                             
            <Route path="/" render={props=><NoAuthLayout isAuthenticated={isAuth} onTokenAccept={this.handleToken} {...props}/>}/>  
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
