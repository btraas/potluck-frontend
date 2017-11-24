import React, { Component } from 'react';
import { Card, Header, Segment } from 'semantic-ui-react'

class Invitation extends Component {

    render() {
        if(this.props.data == null) 
        {
            return (
                <Card className="no-event-card">
                    <Segment attached className='no-event-content'>
                        <h4 className='no-event-text'>No Event</h4>
                    </Segment>
                </Card>
            );
        } else 
        {
            const {eventId, event, applicationUserId} = this.props.data;
            return (
                <Card className="event-card">
                    <Header className='event-header' as='h5' attached='top'>{event? event.title :"N/A"}</Header>
                    <Segment attached className='event-content'>
                        Event ID: {eventId} <br/>
                        Application User ID: {applicationUserId}
                    </Segment>
                </Card>
            );
        }
       
  }
}
export default Invitation;