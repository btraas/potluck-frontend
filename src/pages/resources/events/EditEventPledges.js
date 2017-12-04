import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { Button, Container, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Event from '../../../components/Event';
import axios from 'axios';
import '../../../css/dashboard.css';
import { getItemsForEvent } from '../../../api/ItemsApi'
import { getItemCategories } from '../../../api/ItemCategoriesApi'
import jwt_decode from 'jwt-decode';

class EditEventPledges extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error:false,
            Events: [],
            Invitations: [],
            Items: [
            ],
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/api/';
        this.endpoints = ['Events']; 
        this.api = new ApiHelper();
        this.userId = jwt_decode(sessionStorage.getItem("id_token")).sub
        this.accessToken = sessionStorage.getItem("access_token");
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleItemNameChange = this.handleItemNameChange.bind(this);
        this.handleItemQuotaChange = this.handleItemQuotaChange.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleItemUnitOfMeasurementChange = this.handleItemUnitOfMeasurementChange.bind(this);
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

        itemCategories.forEach(function (item) {
            self.state.Items.push({
                "name" : item.name,
                "itemCategoryId" : item.itemCategoryId,
                "items" : []
            });
        });

        items.forEach(function (item) {
            self.state.Items.forEach(function (itemCat) {
                if (item.itemCategoryId == itemCat.itemCategoryId) {
                    console.log (self.state.Items);
                    itemCat.items.push(item);
                }
            });
        });

        this.setState({ items, eventId });
    }

    handleItemNameChange = (idx, itemIdx) => (evt) => {
        console.log (this.state.Items[idx]);
        let itemArr = this.state.Items;

        const newItem = itemArr[idx].items.map((item, sidx) => {
          if (itemIdx !== sidx) 
            return item;

          return { ...item, itemName: evt.target.value };
        });

        itemArr[idx].items = newItem;

        this.setState({ Items: itemArr });
    }

    handleItemQuotaChange = (idx, itemIdx) => (evt) => {
        let itemArr = this.state.Items;

        const newItem = this.state.Items[idx].items.map((item, sidx) => {
          if (itemIdx !== sidx) return item;
          return { ...item, quota: evt.target.value };
        });

        itemArr[idx].items = newItem;

        this.setState({ Items: itemArr });
    }

    handleItemUnitOfMeasurementChange = (idx, itemIdx) => (evt) => {
        let itemArr = this.state.Items;

        const newItem = this.state.Items[idx].items.map((item, sidx) => {
          if (itemIdx !== sidx) return item;
          return { ...item, unitOfMeasurement: evt.target.value };
        });

        itemArr[idx].items = newItem;

        this.setState({ Items: itemArr });
    }

    handleAddItem = (idx) => (evt) => {
        var self = this;
        console.log (this.state.Items[idx]);

        let itemArr = this.state.Items;

        itemArr[idx].items = this.state.Items[idx].items.concat([{ 
            itemName: '', 
            quota: 0, 
            eventId: self.state.eventId,
            unitOfMeasurement: null,
            tags: null,
            event: null,
            itemCategoryId: self.state.Items[idx].itemCategoryId,
            itemCategory: null,
            pledges: null
        }]);

        this.setState({
            Items: itemArr
        })
    }
      
    handleRemoveItem = (idx, itemIdx) => (evt) => {
        let itemArr = this.state.Items;
        itemArr[idx].items = this.state.Items[idx].items.filter((s, sidx) => itemIdx !== sidx)
        
        this.setState({ Items: itemArr});
    }

    handleSubmit = (evt) => {
        this.setState({ loading: true })
        
        let url = 'http://potluckapi.azurewebsites.net/api/Items';

        var self = this;

        this.state.Items.forEach(function(itemsGroup) {
            itemsGroup.items.forEach(function (item) {
                let data = JSON.stringify(item);
                if (item.itemId != null) {
                    axios({
                        url: url + "/" + item.itemId,
                        method: "put",
                        headers: {
                            Authorization: `Bearer ${self.accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        data: data
                    }).then(response => {
                        // If event is successfully created
                        self.setState({ success: response.status === 201 })
                        self.setState({ loading: false })
                    }).catch(e => {
                        console.log(e)
                        self.setState({ success: false })
                        self.setState({ loading: false })
                    })
                } else {
                    axios({
                        url: url,
                        method: "post",
                        headers: {
                            Authorization: `Bearer ${self.accessToken}`,
                            'Content-Type': 'application/json',
                        },
                        data: data
                    }).then(response => {
                        // If event is successfully created
                        self.setState({ success: response.status === 201 })
                        self.setState({ loading: false })
                    }).catch(e => {
                        console.log(e)
                        self.setState({ success: false })
                        self.setState({ loading: false })
                    })
                }
            });
        });
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
                    <table>
                        {this.state.Items.map((itemCat, idx) => (
                            <Grid.Row>
                            <tr >
                                <td colspan="4" className="event-header">
                                    {itemCat.name}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Item
                                </td>
                                <td>
                                    Qty
                                </td>
                                <td>
                                    Unit of measurement
                                </td>
                                <td>
                                    <Button onClick={ this.handleAddItem(idx) }>+</Button>
                                </td>
                            </tr>  
                                {itemCat.items.map((item, itemidx) => (
                                    <tr>

                                        <td>
                                            <Input 
                                                type="text"
                                                placeholder={`${itemCat.name} #${itemidx + 1} name`}
                                                value={item.itemName}
                                                onChange={ this.handleItemNameChange(idx, itemidx)}/>
                                        </td>
                                        <td>
                                            <Input 
                                                type="text"
                                                placeholder={`${itemCat.name} #${itemidx + 1} quota`}
                                                value={item.quota}
                                                onChange={ this.handleItemQuotaChange(idx, itemidx)}/> 
                                        </td>
                                        <td>
                                            <Input 
                                                type="text"
                                                placeholder={`${itemCat.name} #${itemidx + 1} unit of measurement`}
                                                value={item.unitOfMeasurement}
                                                onChange={ this.handleItemUnitOfMeasurementChange(idx, itemidx)}/> 
                                        </td>

                                        <td>
                                            <Button onClick={this.handleRemoveItem(idx, itemidx)}>X</Button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </Grid.Row>
                        ))}
                        </table>
                    
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