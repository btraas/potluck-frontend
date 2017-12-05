import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { Button, Container,Form, Dropdown, Segment, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Event from '../../../components/Event';
import axios from 'axios';
import '../../../css/dashboard.css';
import { getItemsForEvent, getItemById } from '../../../api/ItemsApi'
import { getItemCategories } from '../../../api/ItemCategoriesApi'
import { getPledgesByUserId } from '../../../api/PledgesApi'
import jwt_decode from 'jwt-decode';

class YourPledges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error:false,
            Events: [],
            Invitations: [],
            Items: {},
            ItemCategories: [],
            Pledges: [],
            PledgeItems: [],
            SelectedCat: null,
            SelectedItem: null,
            Quantity: 0,
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'https://potluckapi.azurewebsites.net/api/';
        this.endpoints = ['Events']; 
        this.api = new ApiHelper();
        this.userId = jwt_decode(sessionStorage.getItem("id_token")).sub
        this.accessToken = sessionStorage.getItem("access_token");
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handlePledgeItemChange = this.handlePledgeItemChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
    }

    async componentDidMount() {
        // Start loading
        this.setState({ loading: true })

        this.collect();
        await this._processEvent();

        // End loading 
        this.setState({ loading: false })
    }

    _processEvent = async () => {
        const { eventId } = this.props.match.params
        let itemCategories = await getItemCategories();
        let items = await getItemsForEvent(eventId)

        var self = this;

        /* itemCategories.forEach(function (item) {
            self.state.Items.push({
                "name" : item.name,
                "itemCategoryId" : item.itemCategoryId,
                "items" : []
            });
        }); */

        /*
        items.forEach(function (item) {
            self.state.Items.forEach(function (itemCat) {
                if (item.itemCategoryId == itemCat.itemCategoryId) {
                    console.log (self.state.Items);
                    itemCat.items.push(item);
                }
            });
        }); */

        itemCategories.forEach(function (item, index) {
            console.log (item);
            self.state.ItemCategories.push({
                value : item.itemCategoryId,
                text  : item.name,
                key  : index,
            });
            // self.state.ItemCategories.push ({)
        });
        
        console.log (self.state.ItemCategories);

        // console.log (itemCategories);

        this.state.Items = items;

        this.setState({ items, eventId });
        // this.state.ItemCategories = itemCategories;
        // this.setState ({ItemCategories : itemCategories})
        console.log (this.state.ItemCategories);

        // console.log (items);

        let pledges = await getPledgesByUserId(self.userId);

        // console.log (self.userId);

        // console.log (pledges);

        // pledges = pledges.filter((s, sidx) => s.applicationUserId == self.userId);

        // console.log (pledges);

        pledges.forEach (function (pledge) {
            let item = self.state.Items.filter((s, sidx) => s.itemId === pledge.itemId);
            console.log (item);
            if (item != null && item != undefined)
                pledge.item = item[0];
        })

        pledges = pledges.filter((s, sidx) => (s.item != undefined && s.item != null))
        
        console.log (pledges);

        this.setState ({
            Pledges : pledges
        })


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

    handleCategoryChange = (e, { name, value }) => {
        console.log (this.state.ItemCategories);
        // console.log (value)// this.setState({ [name]: value })
        let items = this.state.Items.filter((s, sidx) => s.itemCategoryId === value);
        var self = this;
        let itemArr = [];
        console.log (itemArr);
        items.forEach (function (item, index) {
            console.log (item);
            itemArr.push({
                value : item.itemId,
                text  : item.itemName,
                key   : index,
            });
            // itemArr.push ()
        });
        // console.log (items);

        console.log (itemArr);

        this.setState(
            {
                PledgeItems : itemArr,
                SelectedCat : value
            }
        );
    }
        // PledgeItems

    handlePledgeItemChange = (e, { name, value }) => {
        // console.log (value);
        this.setState({
            SelectedItem : value
        })
    }

    handleQuantityChange = (evt) => {
        this.setState ({
            Quantity : evt.target.value
        })
    }

    handleSubmit = (evt) => {
        this.setState({ loading: true })
        
        let url = 'https://potluckapi.azurewebsites.net/api/Pledges';

        var self = this;

        // items.filter((s, sidx) => itemIdx !== sidx)
        if (this.state.Quantity <= 0) {
            alert ("Pledege Quantity cannot be 0 or negative");
            return;
        }

        let item = this.state.Items.filter((s, sidx) => s.itemId === this.state.SelectedItem)

        if (item == undefined || item[0] == undefined) {
            alert ("Item does not exist");
            return;
        }

        console.log (this.state.Pledges);

        let checkItem = this.state.Pledges.filter((s, idx) => s.item.itemId === this.state.SelectedItem);

        console.log (checkItem);

        if (checkItem != undefined && checkItem[0] != undefined) {
            alert ("Already pledged for item : " + checkItem[0].item.itemName);
            return;
        }

        console.log (item);

        let totalAmt = 0;

        item[0].pledges.forEach(function (pledgeItem) {
            console.log (pledgeItem);
            totalAmt += parseInt(pledgeItem.quantity);
        });

        let remaining = parseInt(item[0].quota - parseInt(totalAmt));

        let userRemaining = remaining - this.state.Quantity;
        console.log (remaining);

        if (remaining <= 0 || userRemaining < 0) {
            alert ("Exceeded Quota\n Quota : " + item[0].quota + "\nRemaining : " + remaining);
            return;
        }

        let pledge = {};

        pledge.itemId = this.state.SelectedItem;

        pledge.quantity = parseInt(this.state.Quantity);

        pledge.applicationUserId = this.userId;
        
        console.log (pledge);

        let data = JSON.stringify(pledge);

        console.log (data);

        axios({
            url: url,
            method: "post",
            headers: {
                Authorization: `Bearer ${self.accessToken}`,
                'Content-Type': 'application/json',
            },
            data : data
        }).then(response => {
            // If event is successfully created
            self.setState({ success: response.status === 201 })
            self.setState({ loading: false })
        }).catch(e => {
            console.log(e)
            self.setState({ success: false })
            self.setState({ loading: false })
        })
        
        this.props.history.push("/dashboard/events/" + this.state.eventId);
    }

    handleRemovePledge = (idx) => {
        let pledge = this.state.Pledges[idx]
        let url = 'https://potluckapi.azurewebsites.net/api/Pledges/' + pledge.itemId + "/" + pledge.applicationUserId;
        axios({
            url: url,
            method: "delete",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then(response => {
            // If event is successfully created
            this.setState({ success: response.status === 201 })
            this.setState({ loading: false })
        }).catch(e => {
            console.log(e)
            this.setState({ success: false })
            this.setState({ loading: false })
        })

        let pledges = this.state.Pledges.filter((s, sidx) => idx !== sidx)
        
        this.setState({Pledges : pledges})
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

                            {this.state.Pledges.length > 0 && this.state.Pledges.map((pledge, idx) => (
                                <Grid.Row centered as={Container}  className="event-header">
                                    <Grid.Column mobile={16} computer={7} textAlign="center">
                                        {pledge.item.itemName}
                                    </Grid.Column>
                                    <Grid.Column mobile={16} computer={7} textAlign="center">
                                        {pledge.quantity}
                                    </Grid.Column>
                                    <Grid.Column mobile={16} computer={2} textAlign="center">
                                        <Button onClick={this.handleRemovePledge(idx)}>X</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            ))}
                            
                            <Grid.Row centered as={Container}>
                                <Grid.Column mobile={16} computer={16} textAlign="center">
                                    <h1>Add Pledge</h1>
                                </Grid.Column>
                            </Grid.Row>
                            <br/><br/><br/>
                                <Grid.Row centered as={Container}>
                                    <Grid.Column mobile={16} computer={16} textAlign="center">
                                        <Dropdown placeholder='Category' fluid selection options={this.state.ItemCategories} onChange={this.handleCategoryChange}/*fluid selection options={friendOptions}*/ />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row centered as={Container}>
                                    <Grid.Column mobile={16} computer={16} textAlign="center">
                                        <Dropdown placeholder='Item' fluid selection options={this.state.PledgeItems} onChange={this.handlePledgeItemChange}/*fluid selection options={friendOptions}*/ />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row centered as={Container} >
                                    <Grid.Column mobile={16} computer={4} textAlign="center">
                                        Quantity
                                    </Grid.Column>
                                    <Grid.Column mobile={16} computer={4} textAlign="center">
                                        <Input 
                                            type="text"
                                            placeholder="1"
                                            value={this.state.Quantity}
                                            onChange={ this.handleQuantityChange} />
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row centered as={Container} >
                                    <Grid.Column mobile={16} computer={8} textAlign="center">
                                    <Button as={Link} to={`/dashboard/events/${this.state.eventId}`}>Cancel</Button>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} computer={8} textAlign="center">
                                        <Button onClick={this.handleSubmit}>Add Pledge</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            
                </Grid>
            </div>
        );
  }
}
export default YourPledges;