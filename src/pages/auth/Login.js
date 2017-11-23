import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Form, Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import '../../css/reglog.css'
//import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Email:'',
            Password:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/Connect/Login';        
    }

    handleChange(e, {name, value}) {
        this.setState({[name]:value})
    }

    handleSubmit(event) {
        const {Email, Password} = this.state;
        fetch(this.baseUrl, {
            method:'POST', 
            body:JSON.stringify({username:Email, password:Password})
        })
        .then((response)=>{ console.log(response) });
    }

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
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input label='E-mail' name='Email' type='email' placeholder="E-mail"/>
                                <Form.Input label='Enter Password' type='Password' placeholder="Enter password"/>
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
