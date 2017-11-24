import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Form, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import '../../css/reglog.css'
//import { Link } from 'react-router-dom';

class Register extends Component {
  render() {
    return (
        <DocumentTitle title='Potluck - Register'>
            <Grid padded centered id="auth-page">
                <Grid.Row centered>
                    <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                        <br />
                        <span className="title">Potluck</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                        <span className="flavor">Sign up</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                        <Form>
                            <Form.Input label='First Name' type='text' placeholder="First Name"/>
                            <Form.Input label='Last Name' type='text' placeholder="Last Name"/>
                            <Form.Input label='E-mail' type='email' placeholder="E-mail"/>
                            <Form.Input label='Enter Password' type='password' placeholder="Enter password"/>
                            <Form.Input label='Confirm Password' type='password' placeholder="Confirm password"/>
                            <label> &nbsp;
                            <button className="confirm-button" name="submit">Sign Up</button>
                            </label>
                        </Form>
                        <br />
                        <h2 className="decorated"><span className="or">or</span></h2>
                        <br />
                        <span className="already">Already have an account?</span>
                        <br />
                        <label> &nbsp;
                            <button className="switch-button" name="submit">Log In</button>
                        </label>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </DocumentTitle>
    );
  }
}

export default Register;
