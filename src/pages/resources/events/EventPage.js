import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { Link } from 'react-router-dom';

import { 
    Container, 
    Grid, 
    Dropdown, 
    Progress,
    Segment,
    Header,
    Dimmer,
    Loader,
    Button,
    Form
} from 'semantic-ui-react';
import DayPicker from 'react-day-picker'
import { getEventById, updateEvent, deleteEvent } from '../../../api/EventsApi'
import { getInvitations } from '../../../api/InvitationsApi'
import { addInvitations } from '../../../api/InvitationsApi'
import { deleteInvitation } from '../../../api/InvitationsApi'
import { getItemsForEvent } from '../../../api/ItemsApi'
import { getPledges } from '../../../api/PledgesApi'
import { getItemCategories } from '../../../api/ItemCategoriesApi'
import { getUsers         } from '../../../api/UsersApi'
import jwt_decode from 'jwt-decode';
import '../../../css/event.css';
import _ from 'lodash'

const options = [
    { key: 1, text: 'Attending', value: 1 },
    { key: 2, text: 'Not Attending', value: 2 },
    { key: 3, text: 'Invited', value: 0 }
]


const HOURS = _.range(1, 12).map((hour) => { return { key: hour, value: hour, text: hour < 10 ? `0${hour}` : hour } })
const DUR_HOURS = _.range(1, 13).map((hour) => { return { key: hour, value: hour, text: hour < 10 ? `0${hour} hours` : `${hour} hours` } })

const MINUTES = _.range(0, 60).map((minute) => { return { key: minute, value: minute, text: minute < 10 ? `0${minute}` : minute } })
const DUR_MINUTES = _.range(0, 60).map((minute) => { return { key: minute, value: minute, text: minute < 10 ? `0${minute} mins` : `${minute} mins` } })

const AM_PM = [{ key: 'am', value: 'am', text: 'am' }, { key: 'pm', value: 'pm', text: 'pm' }];

class EventPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            event: {},
            guests: [],
            users: [],
            pledgesForEvent: [],
            isUserHost: false,
            loading: false,
            invites: [],
            edit: {
                location: false,
                date: false,
                description: false,
                title : false,
                guests: false,
            },
            submit : {
                location    : null,
                startDate   : null,
                description : null,
                title       : null,
                endDate     : null
            },
            date : {
                noon     : null,
                day      : null,
                hours    : null,
                durHours : null,
                mins     : null,
                durMins  : null
            }
        };

        this.api = new ApiHelper()
        this.userId = jwt_decode(sessionStorage.getItem("id_token")).sub
        this.accessToken = sessionStorage.getItem("access_token")
    }


    async componentWillMount() {
        // Start loading
        this.setState({ loading: true })

        await this._processEvent()
        await this._processPledges()
        await this._processGuests()
        await this._processUsers()
        this._processIsUserHost()


        // End loading 
        this.setState({ loading: false })
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
        const { eventId } = this.props.match.params

        let itemCategories = await getItemCategories()
        let items = await getItemsForEvent(eventId)
        let pledges = await getPledges()



        const pledgesForEvent = _.map(itemCategories, (itemCategory) => {

            let totalForCategory = 0;
            let completedForCategory = 0;

            let itemsForCategory = _.map(_.filter(items, { 'itemCategoryId': itemCategory.itemCategoryId }),
                (item) => {
                    const { itemName, itemId } = item

                    let _pledges = _.reduce(_.filter(pledges, { itemId }), // accounted for
                        (sum, pledge) => { return sum + pledge.quantity }, 0);


                    totalForCategory += item.quota;
                    completedForCategory += _pledges;

                    return {
                        ...{ itemName },
                        quota: item.quota, // total
                        pledgesCount: _.reduce(_.filter(pledges, { itemId }), // accounted for
                            (sum, pledge) => { return sum + pledge.quantity }, 0),
                    }
                });


            return {
                category: {
                    name: itemCategory.name,
                    items: itemsForCategory,
                    totalForCategory: totalForCategory,
                    completedForCategory: completedForCategory
                }
            }
        })

        this.setState({ pledgesForEvent })
    }

    /**
     * 
     */
    _processIsUserHost = () => {
        const { organizerId } = this.state.event

        this.setState({ isUserHost: this.userId === organizerId })
    }

    /**
     * 
     */
    _processGuests = async () => {
        const { eventId } = this.props.match.params

        let invitations = await getInvitations()
        let invitationsForEvent = await _.filter(invitations, { eventId: parseInt(eventId)})
        let guests = _.map(invitationsForEvent, (invitation) => {
            return { ...invitation.applicationUser }
        })

        this.setState({ guests })
    }

    _processUsers = async () => {
        let users = await getUsers()

        this.setState({users})
    }

    /**
     * 
     */
    _handleEdit = (field, open) => {
        this.setState({ edit: { [field]: open } })
    }

    /**
     * 
     */
    _handleSubmit = async (field) => {
        this.setState({ loading : true })

        let event = { ...this.state.event }

        // Assign the new value for the field
        if (field === "date") {
            let dates    = this._getEventDate()
            event.startTime = dates.startDate.toISOString()
            event.endTime   = dates.endDate.toISOString()
        } else {
            event[field] = this.state.submit[field];
        }

        // Remove invitations and organizer object
        delete event.invitations
        delete event.organizer

        let response = await updateEvent(event)
        
        // Blank string means success as Back End only returns empty string for the success PUT request
        if (response === "") {
            this.setState({ edit : { [field] : false } })
            
            // Reload event
            await this._processEvent()
        }

        this.setState({ loading : false })
    }

    /**
     * 
     */
    _onChangeFields = (field, value) => {
        this.setState({ submit : { [field] : value } })
    }

    /**
     * 
     */
    _onChangeDate   = (dateField, value) => {
        let current = { ...this.state.date }

        delete current[dateField]

        this.setState({ date : { [dateField] : value, ...current } })
    }

    /**
     * 
     */
    _deleteEvent = async () => {
        const { eventId } = this.props.match.params

        let deletedEvent = await deleteEvent(eventId)

        if (deletedEvent !== null && deletedEvent.eventId === parseInt(eventId)) {
            this.props.history.goBack()
        }
    }

    /**
     * 
     */
    _getEventDate = () => {
        let startDate = this.state.date.day
        let endDate   = new Date(startDate)

        startDate.setMinutes(this.state.date.mins)
        startDate.setHours(this.state.date.hours + (this.state.date.noon === "am" ? 0 : 12))

        endDate.setHours(startDate.getHours() + this.state.date.durHours)
        endDate.setMinutes(startDate.getMinutes() + this.state.date.durMins)

        return { startDate, endDate }
    }

    addInvites = async () => {
        const invites = this.state.invites
        const eventId = this.state.event.eventId
        let response = await addInvitations(eventId, invites)
        if (response) {
            this._handleEdit('guests', false)
            await this._processGuests()
        }

    }

    handleInvitesChange = (e, { name, value }) => {
        this.setState({invites: value})
    }

    processUsersForSearch(users) {
        return users.map((user, index) => (
            {
                text : user.firstName + ' ' + user.lastName + ' (' + user.email + ')',
                key: index,
                value: user.applicationUserId
            }
        ));
    }

    handleDelete = async (eventId, userId) => {
        let response = await deleteInvitation(eventId,userId)
        if (response) {
            await this._processGuests()
        }
    }

    render() {
        let userOptions = this.processUsersForSearch(this.state.users)
        const eventId = this.state.event.eventId
        return (
            <div style={{ marginBottom: 20 }}>
                <Dimmer active={this.state.loading}>
                    <Loader size="massive" />
                </Dimmer>
                {!this.state.loading &&
                    <div>
                        <Segment className="dark-background">
                            <div style={{ margin: '0 auto' }} >
                                {
                                    this.state.edit.title &&
                                    <div style={{ display : "inline", width: "100%", height : "100px"}}>
                                        <Form.Input name='title' 
                                                    placeholder='Title'
                                                    value={this.state.submit.title === null ? this.state.event.title : this.state.submit.title}
                                                    onChange={(event, { name, value }) => { this._onChangeFields('title', value) }} 
                                                    required size="large"/>
                                        <Button className="cancel-button" onClick={() => { this._handleEdit('title', false) }}>Cancel</Button>
                                        <Button className="positive-button" onClick={() => { this._handleSubmit('title') }}>Confirm</Button>
                                    </div>

                                }
                                {
                                    !this.state.edit.title &&
                                    <Segment basic className="title">
                                        <Header as='h1' 
                                                inverted 
                                                content={this.state.event.title}
                                                style={{ fontSize: "3rem", fontWeight: "normal", marginTop: "40px"}}
                                                />
                                        {
                                            (this.state.isUserHost) && 
                                            <div className="" style={{position: 'absolute', right : 0, top: 0, marginRight: "-5px", marginTop : "-5px"}}>
                                                <Button className="title-edit-button full-opacity-hover" compact onClick={() => { this._handleEdit('title', true) }}>
                                                    Edit
                                                </Button>
                                                <Button className="title-delete-button full-opacity-hover" compact onClick={() => { this._deleteEvent() }}>
                                                    Delete Event
                                                </Button>
                                            </div>
                                        }
                                    </Segment>
                                }
                                <Segment basic className="title">
                                    <Header as='h2'
                                            inverted
                                            style={{ fontSize: '1.7em', fontWeight: 'normal', marginBottom: "50px" }}>
                                        <span style={{color: "#88B652"}}>Hosted by</span> {this.state.event.organizer.firstName} {this.state.event.organizer.lastName}

                                    </Header>
                                </Segment>

                                {/*<Segment basic className="title">*/}
                                    {/*<Button style={{margin: '0 auto', width: "200px"}} className="title-delete-button" color="red" compact onClick={() => { }}>*/}
                                        {/*Delete Event*/}
                                    {/*</Button>*/}
                                {/*</Segment>*/}

                                <div style={{position: "absolute", right: "0", bottom: "0", margin: "10px"}} >
                                    {this.state.isUserHost && <Button as={Link} to={`/dashboard/events/${this.state.event.eventId}/${this.userId}/yourpledges`} className="right-aligned-p">My Pledges</Button>}
                                </div>


                            </div>
                        </Segment>
                        <Grid container centered id="event-page">
                            {/*<Grid.Row centered as={Container} >*/}
                                {/*<Grid.Column mobile={16} computer={8} textalign="center">*/}
                                    {/*<Segment className="hosting-pledge ">*/}
                                        {/*{*/}
                                            {/*this.userId === this.state.event.organizerId ?*/}
                                                {/*<span>Hosting</span> :*/}
                                                {/*<Dropdown button fluid placeholder="Status" options={options} style={{ textalign: "center", backgroundColor: "transparent" }} />*/}
                                        {/*}*/}
                                    {/*</Segment>*/}
                                {/*</Grid.Column>*/}
                                {/*<Grid.Column mobile={16} computer={8} textalign="center">*/}
                                    {/*<Segment className="hosting-pledge">*/}
                                    {/*{this.state.isUserHost && <Button as={Link} to={`/dashboard/events/${this.state.event.eventId}/${this.userId}/yourpledges`} className="right-aligned-p">Your Pledges</Button>}*/}
                                    {/*</Segment>*/}
                                {/*</Grid.Column>*/}
                            {/*</Grid.Row>*/}
                            <Grid.Row centered as={Container}>
                                <Grid.Column mobile={16} computer={16} textalign="left">
                                    <Segment className="medium-background">
                                        {
                                            this.state.edit.location &&
                                            <div>
                                                <Button compact className="right-aligned-p button-over cancel-button" onClick={() => { this._handleEdit('location', false) }}>Cancel</Button>
                                                <Button compact className="right-aligned-p button-over positive-button" onClick={() => { this._handleSubmit('location') }}>Confirm</Button>
                                            </div>
                                        }
                                        <Grid.Row className="location">
                                            <h2 className="light-text">Location</h2>
                                            {
                                                (this.state.isUserHost && !this.state.edit.location)
                                                && <Button compact onClick={() => { this._handleEdit('location', true) }}>Edit</Button>
                                            }
                                        </Grid.Row>
                                        {
                                            this.state.edit.location ?
                                                <Form.Input name='location' 
                                                            placeholder='Event Location'
                                                            value={this.state.submit.location === null ? this.state.event.location : this.state.submit.location}
                                                            onChange={(event, { name, value }) => { this._onChangeFields('location', value) }} 
                                                            required fluid /> :
                                                <p className="dark-text" style={{fontSize: "2em"}}>{this.state.event.location}</p>
                                        }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container}>
                                <Grid.Column mobile={16} computer={16} textalign="left">
                                    <Segment className="medium-background light-text" style={{padding: "0"}}>
                                        {
                                            this.state.edit.date &&
                                            <div>
                                                <Button className="right-aligned-p button-over cancel-button" onClick={() => { this._handleEdit('date', false) }}>Cancel</Button>
                                                <Button className="right-aligned-p button-over positive-button" onClick={() => { this._handleSubmit('date') }}>Confirm</Button>
                                            </div>
                                        }
                                        {
                                            this.state.edit.date ?
                                                (<div>
                                                    <Form.Field required style={{margin: "10px"}}>
                                                        <h2>Event Date:</h2>
                                                        <div className="daypicker-form" >
                                                            <DayPicker
                                                                onDayClick={(day) =>{ this._onChangeDate('day', day) }}
                                                                fromMonth={new Date()}
                                                                className="event-date-picker"
                                                                disabledDays={{ before: new Date() }}
                                                                selectedDays={this.state.date.day === null ? new Date(this.state.event.startTime) : this.state.date.day}
                                                            />
                                                        </div>

                                                    </Form.Field>
                                                    <Form.Field required style={{margin: "10px"}}>
                                                        <h2>Event Start Time:</h2>
                                                        <Form.Group inline widths='equal'>
                                                            <Form.Select name='start_time_hours'
                                                                         options={HOURS}
                                                                         onChange={(event, {name, value}) => { this._onChangeDate('hours', value) }}
                                                                         placeholder="Hours"
                                                                         value={this.state.date.hours === null ? new Date(this.state.event.startTime).getHours() % 12 : this.state.date.hours}
                                                                         required />
                                                            <span>:</span>
                                                            <Form.Select name='start_time_mins'
                                                                         options={MINUTES}
                                                                         onChange={(event, {name, value}) => { this._onChangeDate('mins', value) }} placeholder="Mins"
                                                                         value={this.state.date.mins === null ? new Date(this.state.event.startTime).getUTCMinutes() % 60 : this.state.date.mins }
                                                                         required />
                                                            <Form.Select name='start_time_noon'
                                                                         options={AM_PM}
                                                                         onChange={(event, {name, value}) => { this._onChangeDate('noon', value) }}
                                                                         value={this.state.date.noon === null ? "am" : this.state.date.noon}
                                                                         placeholder="am/pm"
                                                                         required />
                                                        </Form.Group>
                                                    </Form.Field>
                                                    <Form.Field required style={{margin: "10px"}}>
                                                        <h2>Event Duration:</h2>
                                                        <Form.Group inline widths='equal'>
                                                            <Form.Select name='duration_hours' options={DUR_HOURS}
                                                                         onChange={(event, {name, value}) => { this._onChangeDate('durHours', value) }} placeholder="Hours" required />
                                                            <Form.Select name='duration_mins' options={DUR_MINUTES}
                                                                         onChange={(event, {name, value}) =>{ this._onChangeDate('durMins', value) }} placeholder="Mins" required />
                                                        </Form.Group>
                                                    </Form.Field>
                                                </div>) :
                                                (
                                                    <div>
                                                        <Segment basic className="date">
                                                            <div>
                                                                <h2>Date:</h2>
                                                                <span className="dark-text">{new Date(this.state.event.startTime).toDateString()}</span>
                                                            </div>
                                                            {
                                                                (this.state.isUserHost && !this.state.edit.date) &&
                                                                <Button compact
                                                                        className="date-edit-button"
                                                                        onClick={() => { this._handleEdit('date', true) }}>Edit</Button>
                                                            }
                                                        </Segment>
                                                        <Segment basic><h2>Duration: </h2><span className="dark-text">{new Date(this.state.event.startTime).toTimeString()}</span>
                                                            <br />Until<br /><span className="dark-text">{new Date(this.state.event.endTime).toTimeString()}</span></Segment>
                                                    </div>
                                                )
                                        }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container}>
                                <Grid.Column computer={16} tablet={16} mobile={16} textalign="left">
                                    <Segment className="medium-background">
                                        <div style={{display: "inline", marginTop: "30px", marginBottom: "30px"}} >
                                            <h2 style={{display: "inline"}} className="light-text">Description:</h2>
                                            {(this.state.isUserHost && !this.state.edit.description)
                                                && <Button compact className="right-aligned-p" onClick={() => { this._handleEdit('description', true) }}>Edit</Button>}

                                        </div>

                                        {
                                            this.state.edit.description &&
                                            <div>
                                                <Button className="right-aligned-p button-over cancel-button" onClick={() => { this._handleEdit('description', false) }}>Cancel</Button>
                                                <Button className="right-aligned-p button-over positive-button" onClick={() => { this._handleSubmit('description')}}>Confirm</Button>
                                            </div>
                                        }
                                        {/*{*/}
                                            {/*<Grid.Row className="description">*/}
                                                {/*/!*<h2 style={{display: "inline", margin: "30px"}} className="light-text">Pledge Status:</h2><br />*!/*/}
                                                {/*{(this.state.isUserHost && !this.state.edit.description)*/}
                                                    {/*&& <Button compact className="right-aligned-p" onClick={() => { this._handleEdit('description', true) }}>Edit</Button>}*/}
                                            {/*</Grid.Row>*/}
                                        {/*}*/}
                                        {
                                            this.state.edit.description ?
                                                <Form.Input name='description' 
                                                            placeholder='Description'
                                                            defaultValue={this.state.event.description} 
                                                            onChange={(event, { name, value }) => { this._onChangeFields('description', value) }}
                                                            required fluid /> :
                                                <p className="light-background dark-text" style={{marginTop: "10px", padding: "5px", borderRadius: "5px"}}>{this.state.event.description}</p>

                                        }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered as={Container}>
                                <Grid.Column computer={16} tablet={16} mobile={16} textalign="left">
                                    <Segment className="medium-background">
                                        <div style={{display: "inline", marginTop: "30px", marginBottom: "30px"}} >
                                            <h2 className="light-text" style={{display: "inline"}} >Pledge Status:</h2>
                                        </div>
                                        {this.state.isUserHost && <Button as={Link} to={`/dashboard/events/${this.state.event.eventId}/editpledges`} className="right-aligned-p dark-text">Edit</Button>}
                                        {
                                            this.state.pledgesForEvent &&
                                            this.state.pledgesForEvent.map((pledge, index) => {
                                                let categoryProgress = _.filter(pledge.category.items, (item) => { return item.quota === item.pledgesCount }).length
                                                let categoryPercent = pledge.category.items.length ?
                                                    ((categoryProgress / pledge.category.items.length) * 100) : 0;

                                                let categoryItems = pledge.category.items.length ? pledge.category.items.length : 0;




                                                return (
                                                    <div key={index}>
                                                        <p className="dark-text" style={{fontSize: "1.5em", fontWeight: "bold"}}>{pledge.category.name + ": "}</p>
                                                        <Progress percent={categoryPercent} progress size="large" >
                                                            <span style={{color: "white", position: "absolute", marginTop: "-35px"}}>{categoryProgress} / {categoryItems}</span>

                                                        </Progress>
                                                        {
                                                            pledge.category.items.length > 0 &&
                                                            (<ul>
                                                                {
                                                                    pledge.category.items.map((item, itemsIndex) => {
                                                                        let itemPercentage = ((item.pledgesCount / item.quota) * 100)

                                                                        return (
                                                                            <li key={itemsIndex} style={{listItemType: "none"}}>
                                                                                <p className="dark-text" style={{fontSize: "1.5em"}}>{item.itemName}</p>
                                                                                <Progress style={{borderRadius: "10px", border: "5px solid white"}} percent={((item.pledgesCount / item.quota) * 100)} size="medium" >
                                                                                    <span style={{color: "white", position: "absolute", marginTop: "-25px"}}>{item.pledgesCount} / {item.quota}</span>

                                                                                </Progress>
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
                                <Grid.Column computer={16} tablet={16} mobile={16} textalign="left">
                                    <Segment className="dark-background">
                                        <div style={{display: "inline", marginTop: "30px", marginBottom: "30px"}} >
                                            <h2 className="light-text">{`Guests (${this.state.guests.length}):`}</h2>
                                        </div>

                                        {
                                            (this.state.isUserHost && !this.state.edit.guests)
                                            && <Button style={{position: "absolute", top: "0", right: "0", margin: "20px"}} className="light-background dark-text" compact onClick={() => { this._handleEdit('guests', true) }}>Add Guest</Button>
                                        }
                                        {
                                            this.state.edit.guests &&
                                                <div>
                                                    <Form onSubmit={this.addInvites}>
                                                        <Form.Dropdown placeholder='Users'
                                                                       name='users'
                                                                       onChange={this.handleInvitesChange}
                                                                       options={userOptions}
                                                                       fluid multiple search selection />
                                                        <Button style={{display: "inline"}} className="cancel-button" onClick={() => { this._handleEdit('guests', false) }}>Cancel</Button>
                                                        <Form.Button content='Submit' style={{display: "inline"}} className="submit-inline" />
                                                    </Form>
                                                </div>
                                        }
                                        <br /><br />
                                        {
                                            this.state.guests.map((guest, index) => {
                                                let statusFlag
                                                switch (guest.status) {
                                                    case 1:
                                                        statusFlag = "fa fa-check"
                                                        break;
                                                    case 2:
                                                        statusFlag = "fa fa-times"
                                                        break;
                                                    case 0:
                                                        statusFlag = "fa fa-question"
                                                        break;
                                                    default:
                                                        statusFlag = "fa fa-question"
                                                        break;
                                                }
                                                return (
                                                        <p className="userName medium-text" textalign="left"><a className={statusFlag}></a> {guest.firstName} {guest.lastName}
                                                            <Button className="right-aligned-p custom"
                                                                    textalign="right"
                                                                    color='red'
                                                                    onClick={() => this.handleDelete( eventId ,guest.applicationUserId)}
                                                            >X</Button>
                                                        </p>
                                                )
                                            })
                                        }
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                }
            </div>
        );
    }
}
export default EventPage