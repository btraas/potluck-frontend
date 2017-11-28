import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';

/**
 * Non-authentication required pages.
 */
class NoAuthLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
        regSuccess: false
    }
    this.handleToken = this.handleToken.bind(this);
    this.regIsSuccessful = this.regIsSuccessful.bind(this);
  }

  handleToken(e) {
    this.props.onTokenAccept(e); 
  }

  regIsSuccessful() {
      this.setState({
          regSuccess: true
      })
  }

  render() {
    const {isAuthenticated} = this.props;
    return (
        <Switch>
            {isAuthenticated && <Redirect to="/dashboard" />}
            <Route exact path='/register' render={props=><Register
                                                            onTokenAccept={this.handleToken}
                                                            regIsSuccessful={this.regIsSuccessful}
                                                            {...props}/>}/>
            <Route exact path='/login' render={props=><Login
                                                        onTokenAccept={this.handleToken}
                                                        regSuccess={this.state.regSuccess} {...props}/>} />
            <Route exact path='/' component={Home}/> 
            <Redirect to="/" />
        </Switch>
    );
  }
}

export default NoAuthLayout;
