import React, { Component } from 'react';
import { Button, Container, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Collection from '../components/Collection';
import Event from '../components/Event';
import Invitation from '../components/Invitation';
import PastEvent from '../components/PastEvent';
import axios from 'axios';
import '../css/dashboard.css';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error:false,
            Events: [],
            Pledges: [],
            Invitations: []
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/api/';
        this.endpoints = ['Events', 'Invitations', 'Pledges'];
    }

    componentDidMount() {
        this.collect();
        console.log(this.props)
    }


    /**
     * Collect all user data.
     */
    collect() {
        let options = {
            headers: {
                Authorization: `Bearer ${this.props.access}`,
                Accept: "application/json"
            }
        };
        axios.all(this.endpoints.map((endpoint) => {
            return axios.get(this.baseUrl + endpoint, options)
        }))
        .then(values => {
            console.log(values);
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
            <div>
                <Dimmer active={loading}>
                    <Loader size="massive"/>
                </Dimmer>
                <Container>
                    {error && <Message error
                        header='There was a problem loading the page. Try refreshing later!'
                    />}
                    <Grid verticalAlign='middle' columns={2} centered padded>
                    <Grid.Row>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <Button as={Link} to="/dashboard/events/create" className='btn-create-event'>Create Event</Button>
                            </Grid.Column>
                            <Grid.Column mobile={9} computer={9} tablet={9}>
                                <Input fluid focus placeholder='Search...' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    
                </Container>
                <br/><br/>
                <Container>
                    <Header className='section-header' as="h2">Attending</Header>
                    <br/>
                    <Collection title="dash-attending" child={Event} data={this.state.Events}/>
                </Container>
                <br/><br/>
                <Container>
                    <Header className='section-header' as="h2">Hosting</Header>
                    <br/>
                    <Collection title="dash-hosting" child={Event} data={this.state.Events}/>
                </Container>
                <br /><br />
                <Container>
                    <Header className='section-header' as="h2">Invited</Header>
                    <br/>
                    <Collection title="dash-invitations" child={Invitation} data={this.state.Invitations}/>
                </Container>
                <br/><br />
                <Container>
                    <Header className='section-header' as='h2'>History</Header>
                    <br/>
                    <Collection title="dash-history" child={PastEvent} data={this.state.Events}/>
                </Container>
                <br /><br />
            </div>
        );
  }
}
export default Dashboard;