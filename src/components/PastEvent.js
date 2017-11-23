import React, { Component } from 'react';
import { Card, Header, Segment } from 'semantic-ui-react'

class PastEvent extends Component {

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
        if(this.state.data == null) 
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
            const { title, location, startTime, endTime} = this.state.data;          
            return (
                <Card className="event-card">
                    <Header className='history-event-header' as='h5' attached='top'>{title}</Header>
                    <Segment attached className='history-event-content'>
                        Location: {location}  
                        <br/>
                        Start Time: {new Date(startTime).toDateString()} 
                        <br/>
                        End Time: {new Date(endTime).toDateString()}   
                    </Segment>
                </Card>
            );
        }
        
  }
}
export default PastEvent;