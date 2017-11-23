import React, { Component } from 'react';
import { Button, Container, Header, Input, Grid } from 'semantic-ui-react'
import Collection from '../components/Collection';
import Event from '../components/Event';
import '../css/eventPage.css';
import { Dropdown } from 'semantic-ui-react';
import { Progress } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';


const options = [
    { key: 1, text: 'Invited', value: 1 },
    { key: 2, text: 'Not Invited', value: 2 },
  ]

class EventPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            Event: []
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/api/Events/';
    }
  
    componentDidMount() {
        this.collect();
    }

    /**
     * Collect all user data.
     */
    collect() {
        let eventid = this.props.match.params.eventId;
        console.log(this.baseUrl + eventid);
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = { header:headers };
        fetch(this.baseUrl+eventid, options)
            .then(response => { return response.json()})
            .then(data => {
                this.setState({
                    Event:data
                });
            })
            .catch(e => {
                console.log('Error: ', e)
            })

    }

    render() {
        
        var organizer = this.state.Event.organizer;
        console.log(this.state.Event);
        return (
            <Container>
            <Grid padded>
                <Grid.Row className="event-tiles" padded centered>
                    <Grid.Column mobile={16} computer={8} tablet={10} textAlign="left">
                        <h1>{this.state.Event.title}</h1>
                        <br/><br/>
                        
                        {/* need to get hosted by from organizer but its says null reference when its not */}
                        <p>hosted by: /placeholder/ </p>
                    </Grid.Column>
                    <Grid.Column mobile={16} computer={8} tablet={10} textAlign="center">
                        <Dropdown placeholder="Status" options={options}/>
                    </Grid.Column>
                </Grid.Row>
                        
                <Grid.Row centered>
                    <Grid.Column className="event-tiles" columns={1} mobile={16} computer={16} tablet={10} textAlign="">
                    <h2>Description</h2>
                    <br/><br/>
                    <p>{this.state.Event.description}</p>
                    </Grid.Column>
                </Grid.Row>
                <br/><br/>
                <Grid.Row>
                    <Grid.Column  className="event-tiles" mobile={16} computer={7} tablet={10} textAlign="left">
                    <h2>Location</h2>
                    <p>{this.state.Event.location}</p>
                    </Grid.Column>
                    <Divider/>
                    <Grid.Column floated='right' className="event-tiles" mobile={16} computer={7} tablet={10} textAlign="left">
                        <h2>Time: </h2>
                        <p>Starts at: {this.state.Event.startTime} Until: {this.state.Event.endTime}</p>
                        
                    </Grid.Column>
                </Grid.Row>
                <br/><br/><br/>
                <Grid.Row >
                    <Grid.Column className="event-tiles" mobile={16} computer={11} tablet={10} textAlign="left">
                        <span>Pledge Status:</span>
                        <p className="right-aligned-p">Button</p>
                        <br/><br/>
                        <p>Food</p>
                        <Progress percent={11} />
                        <ul>
                            <li>
                                <p>Celery</p>
                                <Progress percent={11} />
                            </li>
                        </ul>
                        <br/><br/>
                        <p>Drinks</p>
                        <Progress percent={33} />
                        <br/><br/>
                        <p>Items</p>
                        <Progress percent={76} />
                    </Grid.Column>
                    
                    
                    
                    <Grid.Column floated='right' className="event-tiles" mobile={16} computer={4} tablet={10} textAlign="left">
                        <p>Guests :</p>
                        <p>Vincent H Lee (Lord of the potluck)</p>
                        <p>Matt Li</p>
                        <p>Hansol lee</p>
                    </Grid.Column>
                    
                </Grid.Row>
                
                        

            </Grid>
            </Container>
        );
  }
}
export default EventPage;