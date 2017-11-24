import React, { Component } from 'react';
import { Button, Container, Header, Input, Grid, Loader, Dimmer, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
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
            error:false,
            Events: [],
            Pledges: [],
            Invitations: []
        };
        this.collect = this.collect.bind(this);
        this.baseUrl = 'http://potluckapi.azurewebsites.net/api/';
        this.endpoints = ['events', 'invitations', 'pledges'];
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
        let auth = "Bearer " + this.props.access; 
        headers.append('Accept', 'application/json');
        headers.append("Authorization", auth);
        
        let options = { header:headers };
        Promise.all(this.endpoints.map((endpoint) => {
            return fetch(this.baseUrl+endpoint, options)
                    .then(response => { 
                        if(response.ok) {
                            return response.json()                            
                        } else {
                            throw new Error(response.statusText)                        
                        }
                    })
                    .catch(e => { console.log(e); return e})
        }))
        .then(values => {
            if(values.find(item => { return item !== undefined })) {
                let state = Object.assign({}, this.state);
                values.map((item, index)=> {
                    let stateKey = this.endpoints[index];
                    state[stateKey] = item;
                    return item;
                });
                state.loading = false;
                setTimeout(()=>{this.setState(state)}, 2000);
            } else {
                this.setState({
                    error:true, 
                    loading:false
                });
            }
            
        })
    }

    render() {
        let {loading, error} = this.state;
        return (
            <div>
                <Dimmer active={loading}>
                    <Loader size="massive"/>
                </Dimmer>
                <Container>
                    <Message error={error}
                        header='There was a problem loading the page. Try refreshing later!'
                    />
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