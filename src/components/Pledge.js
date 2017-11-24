import React, { Component } from 'react';
import { Card, Header, Segment } from 'semantic-ui-react'

class Pledge extends Component {

    render() {
        const {title, location, startTime, endTime} = this.props.data;
        return (
            <Card className="event-card">
                <Header className='event-header' as='h5' attached='top'>{title}</Header>
                <Segment attached className='event-content'>
                    Location: {location}    
                </Segment>
            </Card>
        );
  }
}
export default Pledge;