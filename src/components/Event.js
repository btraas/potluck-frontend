import React, { Component } from 'react';
import { Card, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class Event extends Component {

    render() {
        console.log('event');
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
            const { eventId, title, location, startTime, endTime} = this.props.data;
            return (
                <Link to={`/dashboard/events/${eventId}`}>
                    <Card className="event-card">
                        <Header className='event-header' as='h5' attached='top'>{title}</Header>
                        <Segment attached className='event-content'>
                            Location: {location}    
                            <br/>
                            Start Time: {new Date(startTime).toDateString()} 
                            <br/>
                            End Time: {new Date(endTime).toDateString()}
                        </Segment>
                    </Card>
                </Link>
            );
        }
        
  }
}
export default Event;