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
        const {eventId, event, applicationUserId} = this.state.data;
        return (
            <Card className="event-card">
                <Header className='event-header' as='h5' attached='top'>{event?event:"N/A"}</Header>
                <Segment attached className='event-content'>
                    Event ID: {eventId} <br/>
                    Application User ID: {applicationUserId}
                </Segment>
            </Card>
        );
  }
}
export default Invitation;