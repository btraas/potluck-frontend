import React, { Component } from 'react';
import { Card, Header, Segment } from 'semantic-ui-react'

class Invitation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        });
    }

    componentWillReceiveProps(nextProps, prevState) {
        this.setState({
            data: nextProps.data
        });
    }

    render() {
        if(this.state.data.length === 0) 
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
            const {eventId, event, applicationUserId} = this.state.data;
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