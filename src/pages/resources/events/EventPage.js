import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { 
    Container, 
    Grid, 
    Dropdown, 
    Progress,
    Segment,
    Header,
    Dimmer,
    Loader,
    Button
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
            pledgesForEvent : [],
            loading         : false
        };

        this.api          = new ApiHelper()
        this.userId       = jwt_decode(sessionStorage.getItem("id_token")).sub
        this.accessToken  = sessionStorage.getItem("access_token")
    }
  
    componentDidMount() {
        //this.collect();
    }

    async componentWillMount() {
        // Start loading
        this.setState({ loading : true })

        await this._processEvent()
        await this._processPledges()
        await this._processGuests()

        // End loading 
        this.setState({ loading : false })
    }

    _processEvent = async () => {
        const { eventId } = this.props.match.params

        let event = await getEventById(eventId)

        this.setState({ event })
    }

    /**
     * mapStateToProps kinda function that does the massaging of data and setting it to a state 
     */
    _processPledges = async () => {
        const { eventId }  = this.props.match.params

        let itemCategories    = await getItemCategories()
        let items             = await getItemsForEvent(eventId)
        let pledges           = await getPledges()

        const pledgesForEvent = _.map(itemCategories, (itemCategory) => 
                                {
                                    let itemsForCategory = _.map(_.filter(items, { 'itemCategoryId' : itemCategory.itemCategoryId }),
                                                                (item) => 
                                                                {
                                                                    const { itemName, itemId } = item 

                                                                    return {
                                                                        ...{ itemName },
                                                                        quota        : item.quota,
                                                                        pledgesCount : _.reduce(_.filter(pledges, { itemId }), 
                                                                                                (sum, pledge)  => { return sum + pledge.quantity }, 0),
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
    _processGuests = async () => {
        const { eventId }  = this.props.match.params

        let invitations         = await getInvitations()
        let invitationsForEvent = await _.filter(invitations, { eventId, status : 1 })
        
        let guests              = _.map(invitationsForEvent, (invitation) => {
                                        return { ...invitation.applicationUser }
                                    })

        this.setState({ guests })
    }

    render() {
        return (
            <div style={{ marginBottom : 20}}>
             <Dimmer active={this.state.loading}>
                    <Loader size="massive"/>
            </Dimmer>
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
                            {
                                this.userId === this.state.event.organizerId ?
                                <span>Hosting</span> :
                                <Dropdown button fluid placeholder="Status" options={options} style={{ textAlign: "center", backgroundColor : "transparent" }}/>
                            }
                        </Segment>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8} textAlign="center">
                        <Segment>
                            <Button>Pledge</Button>
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
                            <Button className="right-aligned-p">Edit</Button>
                            {
                                this.state.pledgesForEvent &&
                                this.state.pledgesForEvent.map((pledge, index) =>
                                {
                                    let categoryProgress = _.filter(pledge.category.items, (item) => { return item.quota === item.pledgesCount }).length
                                    let categoryPercent  = pledge.category.items.length ?
                                                           ((categoryProgress / pledge.category.items.length) * 100) : 0;

                                    return (
                                        <div key={index}>
                                            <p>{ pledge.category.name + ": " }</p>
                                            <Progress percent={categoryPercent} progress size="large"/>
                                            {
                                                pledge.category.items.length > 0 &&
                                                (<ul>
                                                    {
                                                        pledge.category.items.map((item, itemsIndex) => 
                                                        {
                                                            let itemPercentage = ((item.pledgesCount / item.quota) * 100)

                                                            return (
                                                                <li key={itemsIndex}>
                                                                    <p>{ item.itemName }</p>
                                                                    <Progress percent={ ((item.pledgesCount / item.quota) * 100) } size="medium"/>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>)
                                            }
                                        </div>
                                    )
                                })
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered as={Container} >
                    <Grid.Column mobile={16} textAlign="left">
                        <Segment>
                            <p>Guests :</p>
                            {
                                this.state.guests.map((guest) =>
                                {
                                    return(<p>{`${guest.firstName} ${guest.lastName}`}</p>)
                                })
                            }
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        );
  }
}
export default EventPage;