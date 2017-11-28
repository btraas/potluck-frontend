import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Form, Grid, Message, Modal, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import '../../css/reglog.css'
//import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            error:false,
            regSuccess: props.regSuccess,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this)
        this.baseUrl = 'http://potluckapi.azurewebsites.net/connect/token';        
    }

    /**
     * 
     * @param {*} e         input change event 
     * @param {*} param1    name of input, value of input
     */
    handleChange(e, {name, value}) {
        this.setState({[name]:value})
    }

    /**
     * Pass access token to Application root if successful login. 
     * Triggers error message otherwise.
     * @param {*} event     form submit click event
     */
    handleSubmit(event) {
        const {email, password} = this.state;
        let headers = new Headers();
        headers.append('Content-Type','application/x-www-form-urlencoded');
        let data = `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&grant_type=password&response_type=code`;
        fetch(this.baseUrl, {
            method:'POST', 
            headers: headers,
            body: data
        })
        .then((response) => { return response.json() })
        .then((data) => {
            if(data.error) {
                throw new Error("No user match"); //catch bad grant errors
            } else {
                this.setState({error:false});             
                this.props.onTokenAccept(data);
            }
        })
        .catch((data) => {
            this.setState({error:true});
        })
    }

    handleModalClose() {
        this.setState({ regSuccess: false })
    }

    render() {
        const didRegister = this.state.regSuccess
        console.log(didRegister)
        return (
            <DocumentTitle title='Potluck - Login'>
                <Grid padded centered verticalAlign='top' id="auth-page">
                    <Grid.Row centered>
                        <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                            <br />
                            <span className="title">Potluck</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered >
                        <Grid.Column textAlign="center" computer={6} tablet={10} mobile={16}>
                            <span className="flavor">Sign in</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column computer={6} tablet={10} mobile={16}>
                            <Form onSubmit={this.handleSubmit} error={this.state.error}>
                                <Message error header="We don't have that username and password match in our records!" />
                                <Form.Input onChange={this.handleChange} label='E-mail' name='email' type='email' placeholder="E-mail"/>
                                <Form.Input onChange={this.handleChange} label='Enter Password' name={'password'} type='Password' placeholder="Enter password"/>
                                <label> &nbsp;
                                <button className="confirm-button">Log In</button>
                                </label>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                        {didRegister &&
                        <Grid.Row centered>
                            <Modal size="tiny" open={this.state.regSuccess}>
                                <Modal.Header>
                                    Please Log In
                                </Modal.Header>
                                <Modal.Content>
                                    <p>
                                        Registration was successful, please log in!
                                    </p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button positive icon='checkmark' labelPosition='right' content='Ok' onClick={this.handleModalClose} />
                                </Modal.Actions>
                            </Modal>
                        </Grid.Row>
                        }
                </Grid>
            </DocumentTitle>
        );
    }
}

export default Login;
