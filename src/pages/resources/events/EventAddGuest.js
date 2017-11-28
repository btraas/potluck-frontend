import React, { Component } from 'react';
import ApiHelper from '../../../util/ApiHelper'
import { Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import {
    Container,
    Grid,
    Dropdown,
    Progress,
    Segment,
    Header,
    Dimmer,
    Icon,
    Modal,
    Loader,
    Button
} from 'semantic-ui-react';
import { getEventById     } from '../../../api/EventsApi'
import { getInvitations   } from '../../../api/InvitationsApi'
import { getItemsForEvent } from '../../../api/ItemsApi'
import { getPledges }       from '../../../api/PledgesApi'
import { getItemCategories } from '../../../api/ItemCategoriesApi'
import jwt_decode from 'jwt-decode';
import '../../../css/addGuest.css';
import _ from 'lodash'



class EventAddGuest extends Component {

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
            <div style={{ marginBottom : 20}} className="eventPage">
                <Dimmer active={this.state.loading}>
                    <Loader size="massive"/>
                </Dimmer>
                <Segment className="eventPageMainBanner" style={{ backgroundColor : "#3F664E" , marginHeight:"0px"}}>
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
                <Grid container centered >
                    <Grid.Row centered as={Container} >
                        <Grid.Column mobile={16} computer={16} textAlign="center">
                            <div className="addGuestBanner">
                                <h1 className="addGuestTest">Add Guest(s)</h1>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid container centered >
                    <Grid.Row centered as={Container} >
                        <Grid.Column mobile={16} computer={12} textAlign="center">
                            <Segment className="searchBarPanel" style={{ backgroundColor : "#88B652" , marginHeight:"0px"}}>
                                <Input className="searchBar" icon='users' iconPosition='left' placeholder='Search users...' />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid container centered >
                    <Grid.Row centered as={Container} >
                        <Grid.Column mobile={16} computer={12} >
                            <Segment style={{ backgroundColor : "#88B652" , marginHeight:"0px"}}>
                                {/* user name here */}
                                <p3 className="userName" textAlign="left">Some name</p3>
                                <Button  textAlign="right"color='red'>X</Button>
                            </Segment>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>

                <Grid columns={2} >
                    <Grid.Row>
                        <Grid.Column textAlign="right">
                            <Button className="addguestBtn" as={Link} to="/dashboard"  color='red'>Cancel</Button>
                        </Grid.Column>
                        <Grid.Column textAlign="left">
                            <Modal trigger={<Button className="addguestBtn" color='blue'>Confirm</Button>} basic size='small'>
                                <Header icon='archive' content='Add guest(s)' />
                                <Modal.Content>
                                    <p>Do you want to add these people to your Event?</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button as={Link} to="/dashboard" basic color='red' inverted>
                                        <Icon name='remove' /> No
                                    </Button>
                                    <Button as={Link} to="/dashboard" color='green' inverted>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                </Modal.Actions>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
}
export default EventAddGuest;