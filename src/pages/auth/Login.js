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
            <div className="background">
                <Grid centered columns={5}>
                    <Grid.Row>
                        <Grid.Column textAlign="Center">
                            <br />
                            <span className="title">Potluck</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="Center">
                            <span className="flavor">Sign up</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form>
                                <Form.Input label='E-mail' type='email' placeholder="E-mail"/>
                                <Form.Input label='Enter Password' type='password' placeholder="Enter password"/>
                                <label> &nbsp;
                                <button className="confirm-button">Log In</button>
                                </label>
                            </Form>
                            <h2 class="decorated"><span className="or">or</span></h2>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </DocumentTitle>
    );
  }
}

export default Login;
