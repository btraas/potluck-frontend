import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { 
    Container, 
    Grid, 
    Dropdown, 
    Progress,
    Segment,
    Header 
} from 'semantic-ui-react';
import { getEventById     } from '../../../api/EventsApi'
import { getInvitations   } from '../../../api/InvitationsApi'
import { getItemsForEvent } from '../../../api/ItemsApi'
import { getPledges }       from '../../../api/PledgesApi' 
import { getItemCategories } from '../../../api/ItemCategoriesApi'
import jwt_decode from 'jwt-decode';
import '../../../css/event.css';
import _ from 'lodash'

const options = [
    { key: 1, text: 'Attending', value: 1 },
    { key: 2, text: 'Not Attending', value: 2 },]

class EventPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading         : true,
            event           : {},
            guests          : [],
            pledgesForEvent : []
        };

        this.api          = new ApiHelper()
        this.userId       = jwt_decode(sessionStorage.getItem("id_token")).sub
        this.accessToken  = sessionStorage.getItem("access_token")
    }
  
    componentDidMount() {
        //this.collect();
    }

    async componentWillMount() {
        /*
        await this._fetchEvent()
        await this._fetchItemCategories()
        await this._fetchItems()
        await this._fetchInvitations()
        */

        await this._processPledges()

        console.log(this.state.pledgesForEvent)
    }

    /**
     * Fetch event data.
     */
    _fetchEvent = async () => {
        const { eventId } = this.props.match.params 

        let event = await getEventById(eventId)

        console.log(event)

        this.setState({ event })

        return event
    };


    _processPledges = async () => {
        const { eventId }  = this.props.match.params

        let itemCategories = await getItemCategories()
        let items          = await getItemsForEvent(eventId)
        let pledges        = await getPledges()

        const pledgesForEvent = _.map(itemCategories, (itemCategory) => 
                                {
                                    let itemsForCategory = _.map(_.filter(items, { 'itemCategoryId' : itemCategory.itemCategoryId }),
                                                                (item) => 
                                                                {
                                                                    return {
                                                                        itemName     : item.itemName,
                                                                        quota        : item.quota,
                                                                        pledgesCount : _.filter(pledges, { itemId : item.itemId }).length,
                                                                    }
                                                                })

                                    return { 
                                        category  : {
                                            name  : itemCategory.name,
                                            items : itemsForCategory
                                        }
                                    }
                                })

        this.setState({ pledgesForEvent })
    }

    /**
     * 
     */
    _fetchItemCategories = async () => {

        let itemCategories = await getItemCategories()

        console.log(itemCategories)
        
        this.setState({ itemCategories })

        return itemCategories
    }

    /**
     * 
     */
    _fetchItems = async () => {
        const { eventId } = this.props.match.params 

        let items = await getItemsForEvent(eventId)

        console.log(items)

        return items
    }

    _fetchInvitations = async () => {

        let invitations = await getInvitations()

        console.log(invitations)

        return invitations
    }

    render() {
    
        return (
            <div>
            <Segment style={{ backgroundColor : "green" }}>
                <div style={{ margin : 50 }} >
                    <Header
                        as='h1'
                        content={this.state.event.title}
                        inverted
                        style={{ fontSize: '4em', fontWeight: 'normal'}}
                    />
                    <Header
                        as='h2'
                        content='Hosted by: John Cena'
                        inverted
                        style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                    />
                </div>
            </Segment>
            <Grid container centered id="event-page">
                <Grid.Row centered as={Container} >
                    <Grid.Column mobile={16} computer={8} textAlign="center">
                        <Segment>
                            {/*<span>Hosting</span>*/}
                            <Dropdown button fluid placeholder="Status" options={options} style={{ textAlign: "center", backgroundColor : "transparent" }}/>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8} textAlign="center">
                        <Segment>
                            <span>Pledge</span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered as={Container}>
                     <Grid.Column mobile={16} computer={8} textAlign="left">
                        <Segment>
                            <h2>Location</h2>
                            <p>{this.state.event.location}</p>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8} textAlign="left">
                        <Segment>
                            <p><span>Date: </span>{new Date(this.state.event.startTime).toDateString()}</p>
                            <p><span>Duration: </span>{new Date(this.state.event.startTime).toTimeString()} Until: {new Date(this.state.event.endTime).toTimeString()}</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered as={Container}>
                    <Grid.Column computer={16} tablet={16} mobile={16}  textAlign="left">
                        <Segment>
                            <h2>Description</h2>
                            <br/><br/>
                            <p>{this.state.event.description}</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered as={Container}>
                    <Grid.Column textAlign="left">
                        <Segment>
                            <span>Pledge Status:</span>
                            <p className="right-aligned-p">Button</p>
                            <p>Food</p>
                            <Progress percent={11} />
                            <ul>
                                <li>
                                <p>Celery</p>
                                <Progress percent={11} />
                                </li>
                            </ul>
                            <p>Drinks</p>
                            <Progress percent={33} />
                            <p>Items</p>
                            <Progress percent={76} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered as={Container} >
                    <Grid.Column mobile={16} textAlign="left">
                        <Segment>
                            <p>Guests :</p>
                            <p>Vincent H Lee (Lord of the potluck)</p>
                            <p>Matt Li</p>
                            <p>Hansol lee</p>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        );
  }
}
export default EventPage;