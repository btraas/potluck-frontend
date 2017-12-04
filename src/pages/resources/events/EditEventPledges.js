import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { Button, Container, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Event from '../../../components/Event';
import axios from 'axios';
import '../../../css/dashboard.css';
import { getItemsForEvent } from '../../../api/ItemsApi'

class EditEventPledges extends Component {

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
        this.api = new ApiHelper();
        // this.userId = jwt_decode(sessionStorage.getItem("id_token")).sub
        // this.accessToken = sessionStorage.getItem("access_token")
    }

    async componentDidMount() {
        // Start loading
        this.setState({ loading: true })
        
        await this._processEvent();
        this.collect();

        // End loading 
        this.setState({ loading: false })
    }

    _processEvent = async () => {
        const { eventId } = this.props.match.params
        
        let items = await getItemsForEvent(eventId)

        console.log (items);

        this.setState({ items })
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
                                    POTLUCK
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={16} textAlign="center">
                                    Edit Pledge Quotas
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} className="event-header" >
                                <Grid.Column mobile={16} computer={16} textAlign="left">
                                    Food
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={6} textAlign="left">
                                    Item
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    Qty
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={6} textAlign="left">
                                    <Input/>
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    <Input/>
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    <Button>X</Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={16} textAlign="left">
                                    Drink
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={6} textAlign="left">
                                    Item
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    Qty
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={6} textAlign="left">
                                    <Input/>
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    <Input/>
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    <Button>X</Button>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={16} textAlign="left">
                                    Other
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={6} textAlign="left">
                                    Item
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    Qty
                                </Grid.Column>
                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                    
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={16} textAlign="center">
                                    <Button>Confirm</Button>
                                </Grid.Column>
                            </Grid.Row>
                </Grid>
            </div>
        );
  }
}
export default EditEventPledges;