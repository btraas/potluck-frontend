import React, { Component } from 'react';
import { Card, Header, Segment } from 'semantic-ui-react'

class Pledge extends Component {

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
        const {title, location, startTime, endTime} = this.state.data;
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