import React, { Component } from 'react';
import { Button, Container,Form, Dropdown, Segment, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Event from '../../../components/Event';
import axios from 'axios';
import '../../../css/dashboard.css';

class YourPledges extends Component {

   

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error:false,
            Events: [],
            Invitations: []
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/api/';
        this.endpoints = ['Events']; 
    }

    componentDidMount() {
        this.collect();
    }


    /**
     * Collect all user data.
     */
    collect() {
        const {uid, access} = this.props;
        let options = {
            headers: {
                Authorization: `Bearer ${access}`,
                Accept: "application/json"
            }
        };
        
        axios.all(this.endpoints.map((endpoint) => {
            return axios.get(this.baseUrl + endpoint + '/User/'+ uid, options)
        }))
        .then(values => {
            let state = Object.assign({}, this.state);
            let errors = 0;
            for(let key in values) {
                let value = values[key]; 
                let stateKey = this.endpoints[key];  
                state[stateKey] = value.data;
            }
            //state.error = false;
            state.loading = false;
            this.setState(state);
        });
    }
         
    render() {
        
        let {loading, error} = this.state;
        return (
            <div style={{ margin: 50 }}>
                <Grid container centered id="event-page">
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={16} textAlign="center">
                                    Your Pledges
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={7} textAlign="center">
                                    Pizza
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={7} textAlign="center">
                                    20
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={2} textAlign="center">
                                    <Button>X</Button>
                                </Grid.Column>
                            </Grid.Row>
                            <br/><br/><br/>
                            <Grid.Row centered as={Container} className="event-header">
                                <Grid.Column mobile={16} computer={16} textAlign="center">
                                    <Button>Add Pledge</Button>
                                </Grid.Column>
                            </Grid.Row>
                            <br/><br/><br/>
                                <Grid.Row centered as={Container} className="event-header" >
                                    <Grid.Column mobile={16} computer={16} textAlign="center">
                                        <Dropdown placeholder='Category' /*fluid selection options={friendOptions}*/ />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row centered as={Container} className="event-header" >
                                    <Grid.Column mobile={16} computer={16} textAlign="center">
                                        <Dropdown placeholder='Item' /*fluid selection options={friendOptions}*/ />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row centered as={Container} >
                                    <Grid.Column mobile={16} computer={4} textAlign="center">
                                        Quantity
                                    </Grid.Column>
                                    <Grid.Column mobile={16} computer={4} textAlign="center">
                                        <Input/>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row centered as={Container} >
                                    <Grid.Column mobile={16} computer={8} textAlign="center">
                                        <Button>Cancel</Button>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} computer={8} textAlign="center">
                                        <Button>Add Pledge</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            
                </Grid>
            </div>
        );
  }
}
export default YourPledges;