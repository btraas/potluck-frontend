import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Form, Grid } from 'semantic-ui-react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import '../../css/reglog.css'
//import { Link } from 'react-router-dom';

class Register extends Component {

    constructor() {
        super();
        this.state = {fname: '', lname: '', email: '', password: '', cPassword: ''};
        this.handleSubmit          = this.handleSubmit.bind(this);
        this.handleFNameChange     = this.handleFNameChange.bind(this);
        this.handleLNameChange     = this.handleLNameChange.bind(this);
        this.handleEmailChange     = this.handleEmailChange.bind(this);
        this.handlePasswordChange  = this.handlePasswordChange.bind(this);
        this.handleCPasswordChange = this.handleCPasswordChange.bind(this);

    }
    handleSubmit(event) {
        event.preventDefault();

        if (!event.target.checkValidity()) {
                this.setState({
                invalid: true,
                displayErrors: true,
            });
            return;
        }

        const data = {
                    email           : this.state.email,
                    password        : this.state.password,
                    confirmpassword : this.state.cPassword,
                    firstName       : this.state.fname,
                    lastName        : this.state.lname,
            };
      
        axios({
            url: "http://potluckapi.azurewebsites.net/api/register",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify (data)
        }).then(response => {
            this.setState({ openModal: true, success: response.status === 201 })
            console.log(response);
            this.props.history.push('/login');
        }).catch(e => {
            console.log(e)
            this.setState({ openModal: true, success: false })
        })
    }

    handleFNameChange (e) {
        this.setState({fname: e.target.value});
    }

    handleLNameChange (e) {
        this.setState({lname: e.target.value});
    }

    handleEmailChange (e) {
        this.setState({email: e.target.value});
     }

     handlePasswordChange (e) {
        this.setState({password: e.target.value});
     }

     handleCPasswordChange (e) {
        this.setState({cPassword: e.target.value});
     }

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
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input label='First Name' type='text' placeholder="First Name" value={this.state.fname} onChange={this.handleFNameChange} />
                            <Form.Input label='Last Name' type='text' placeholder="Last Name" value={this.state.lname} onChange={this.handleLNameChange} />
                            <Form.Input label='E-mail' type='email' placeholder="E-mail" value={this.state.email} onChange={this.handleEmailChange} />
                            <Form.Input label='Enter Password' type='password' placeholder="Enter password" value={this.state.password} onChange={this.handlePasswordChange}/>
                            <Form.Input label='Confirm Password' type='password' placeholder="Confirm password" value={this.state.cPassword} onChange={this.handleCPasswordChange}/>
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
