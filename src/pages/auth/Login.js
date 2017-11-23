import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Form, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import '../../css/reglog.css'
//import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
        <DocumentTitle title='Potluck - Login'>
            <Grid padded centered verticalAlign='top'>
                <Grid.Row centered>
                    <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                        <br />
                        <span className="title">Potluck</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                        <span className="flavor">Sign up</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column computer={6} tablet={10} mobile={16}>
                        <Form>
                            <Form.Input label='E-mail' type='email' placeholder="E-mail"/>
                            <Form.Input label='Enter Password' type='password' placeholder="Enter password"/>
                            <label> &nbsp;
                            <button className="confirm-button">Log In</button>
                            </label>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </DocumentTitle>
    );
  }
}

export default Login;
