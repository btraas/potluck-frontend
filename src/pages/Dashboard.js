import React, { Component } from 'react';
import { Button, Container, Header, Input, Grid, Segment, Image } from 'semantic-ui-react'
import '../css/dashboard.css';


class Dashboard extends Component {

    state = { } 

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
                <br /><br />
                <Container>
                    <Header className='section-header' as="h2">Attending</Header>
                    <br />
                    <Grid padded>
                        {/* <Grid.Column mobile={3} computer={3} tablet={3}>
                            <div>
                                <Header className='event-header' as='h5' attached='top'>Event Name</Header>
                                <Segment attached className='event-content'>
                                     BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                </Segment>
                            </div>
                        </Grid.Column> */}
                        <Grid.Column mobile={3} computer={3} tablet={3}>
                            <div className='no-event'>
                                <p className='no-event-text'>
                                    No Event
                                </p>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
                <br /><br />
                <Container>
                    <Header className='section-header' as='h2'>Hosting</Header>
                    <br />
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <br /><br />
                <Container>
                    <Header className='section-header' as='h2'>Invited</Header>
                    <br />
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <br /><br />
                <Container>
                    <Header className='section-header' as='h2'>History</Header>
                    <br />
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='history-event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='history-event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='history-event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='history-event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                            <Grid.Column mobile={3} computer={3} tablet={3}>
                                <div>
                                    <Header className='history-event-header' as='h5' attached='top'>Thanksgiving Mania</Header>
                                    <Segment attached className='history-event-content'>
                                        Thanksgiving Mania BLAH blah blah blah BLAH blah blah blah BLAH blah blah blah BLAH 
                                    </Segment>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
  }
}
export default Dashboard;