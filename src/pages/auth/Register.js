import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import 'semantic-ui-css/semantic.min.css';
//import { Link } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
        <DocumentTitle title='Potluck - Register'>
            <div class="ui centered card">
                <div class="content">
                    <a class="header">Register</a>
                    <div class="ui form success">
                        <div class="field">
                            <label>First Name</label>
                            <input type="text" name="firstName" placeholder="First Name"></input>
                        </div>
                        <div class="field">
                            <label>Last Name</label>
                            <input type="text" name="lastName" placeholder="Last Name"></input>
                        </div>
                        <div class="field">
                            <label>E-mail</label>
                            <input type="email" name="email" placeholder="joe@schmoe.com"></input>
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Enter a password"></input>
                        </div>
                        <div class="field">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm" placeholder="Confirm password"></input>
                        </div>
                        <div class="ui success message">
                            <div class="header">Congrats!</div>
                            <p>You have created a Potluck account!</p>
                        </div>
                        <div class="ui submit button">Submit</div>
                    </div>
                </div>
            </div>
        </DocumentTitle>
    );
  }
}

export default Register;
