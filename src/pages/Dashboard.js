import React, { Component } from 'react';
import { Button, Container, Header, Input, Grid } from 'semantic-ui-react'
import Collection from '../components/Collection';
import Event from '../components/Event';
import Invitation from '../components/Invitation';
import PastEvent from '../components/PastEvent';
import '../css/dashboard.css';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
    }

    /**
     * Collect all user data.
     */
    collect() {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        let options = { header:headers };
        Promise.all(this.endpoints.map((endpoint) => {
            return fetch(this.baseUrl+endpoint, options)
                    .then(response => { return response.json()})
                    .then(data => {
                        return data;
                    });
        }))
        .then(values => {
            let state = Object.assign({}, this.state);
            values.map((item, index)=> {
                let stateKey = this.endpoints[index];
                state[stateKey] = item;
            });
            this.setState(state);
        })
        .catch(e => {
            console.log('Error: ', e)
        })

    }

    render() {
        return (
            <div>
                <Container>
                    <Grid verticalAlign='middle' columns={2} centered padded>
                    <Grid.Row>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <Button className='btn-create-event'>Create Event</Button>
                            </Grid.Column>
                            <Grid.Column mobile={9} computer={9} tablet={9}>
                                <Input fluid focus placeholder='Search BLAH ' />
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