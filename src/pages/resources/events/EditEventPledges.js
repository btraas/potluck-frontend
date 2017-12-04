import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { Button, Container, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Event from '../../../components/Event';
import axios from 'axios';
import '../../../css/dashboard.css';
import { getItemsForEvent } from '../../../api/ItemsApi'
import jwt_decode from 'jwt-decode';

class EditEventPledges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error:false,
            Events: [],
            Invitations: [],
            FoodItems: [
                {
                    "itemId": 29,
                    "itemName": "Forks",
                    "quota": 12,
                    "unitOfMeasurement": "forks",
                    "tags": null,
                    "eventId": 32,
                    "event": null,
                    "itemCategoryId": 21,
                    "itemCategory": null,
                    "pledges": null
                },
            ],
            Items: [{
                "itemId": 29,
                "itemName": "Forks",
                "quota": 12,
                "unitOfMeasurement": "forks",
                "tags": null,
                "eventId": 32,
                "event": null,
                "itemCategoryId": 21,
                "itemCategory": null,
                "pledges": null
            },],
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/api/';
        this.endpoints = ['Events']; 
        this.api = new ApiHelper();
        this.userId = jwt_decode(sessionStorage.getItem("id_token")).sub
        console.log(this.userId);
        this.accessToken = sessionStorage.getItem("access_token")
    }

    async componentDidMount() {
        // Start loading
        this.setState({ loading: true })
        
        this.collect();
        await this._processEvent();

        // End loading 
        this.setState({ loading: false })
    }

    handleFoodItemNameChange = (idx) => (evt) => {
        const newItem = this.state.FoodItems.map((item, sidx) => {
          if (idx !== sidx) return item;
          return { ...item, itemName: evt.target.value };
        });
        
        this.setState({ Items: newItem });
    }

    handleFoodItemQuotaChange = (idx) => (evt) => {
        const newItem = this.state.FoodItems.map((item, sidx) => {
          if (idx !== sidx) return item;
          return { ...item, quota: evt.target.value };
        });

        this.setState({ Items: newItem });
    }

    /*
    "itemId": 29,
                    "itemName": "Forks",
                    "quota": 12,
                    "unitOfMeasurement": "forks",
                    "tags": null,
                    "eventId": 32,
                    "event": null,
                    "itemCategoryId": 21,
                    "itemCategory": null,
                    "pledges": null */

    handleAddFoodItem = () => {
        console.log (this.state.eventId);
        this.setState({ FoodItems: this.state.FoodItems.concat([{ itemName: '', quota: '', eventId: this.state.eventId}]) });
    }
      
    handleRemoveFoodItem = (idx) => () => {
        this.setState({ FoodItems: this.state.FoodItems.filter((s, sidx) => idx !== sidx) });
    }

    handleItemNameChange = (idx) => (evt) => {
        const newItem = this.state.Items.map((item, sidx) => {
          if (idx !== sidx) return item;
          return { ...item, itemName: evt.target.value };
        });
        
        this.setState({ Items: newItem });
    }

    handleAddItem = () => {
        this.setState({ Items: this.state.Items.concat([{ itemName: '' }]) });
    }
      
    handleRemoveItem = (idx) => () => {
        this.setState({ Items: this.state.Items.filter((s, sidx) => idx !== sidx) });
    }

    _processEvent = async () => {
        const { eventId } = this.props.match.params

        let items = await getItemsForEvent(eventId)

        // var FoodItems;

        console.log (items);

        items.forEach(function (item) {
            if (item.itemCategoryId == "20") {
                this.state.FoodItems.push(item);
            }
        });
        

        this.setState({ items, eventId });
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
        displayName: 'Edit Event';
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
                            <Grid.Row centered as={Container} >
                                <Grid.Column mobile={16} computer={16} textAlign="left">
                                    Food
                                    <form onSubmit={this.handleSubmit}>
                                        {this.state.FoodItems.map((item, idx) => (
                                            <Grid.Row centered as={Container} >
                                                <Grid.Column mobile={16} computer={6} textAlign="left">
                                                    <Input type="text"
                                                      placeholder={`Food #${idx + 1} name`}
                                                      value={item.itemName}
                                                      onChange={this.handleFoodItemNameChange(idx)}/>
                                                    <Input type="text"
                                                      placeholder={item.quota}
                                                      value={item.quota}
                                                      onChange={this.handleFoodItemQuotaChange(idx)}/>
                                                </Grid.Column>
                                                <Grid.Column mobile={16} computer={3} textAlign="left">
                                                    <Button onClick={this.handleRemoveFoodItem(idx)}>X</Button>
                                                </Grid.Column>
                                            </Grid.Row>
                                        ))}
                                    </form>
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
                                    <Button onClick={this.handleAddFoodItem}>+</Button>
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
                                    <Button onClick={this.handleSubmit}>Confirm</Button>
                                </Grid.Column>
                            </Grid.Row>
                </Grid>
            </div>
        );
  }
}
export default EditEventPledges;