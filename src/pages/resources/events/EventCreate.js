import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Icon, Step, Grid, Form, Button } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import '../../../css/event.css';

class EventCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 'details',
            details: { prev: '', next: 'date', completed: false, values: {}},
            date: { prev: 'details', next: 'confirm', completed: false, values: {}},
            confirm: {prev: 'date', next: '', completed: false, values: {}}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
    }

    componentDidMount() {
        //TODO get resource 
        //'http://potluckapi.azurewebsites.net/api/';
    }

    /**
     * Complete a step and move to next.
     * @param {*} event 
     */
    handleSubmit(event) {
        let current = Object.assign({}, this.state[this.state.step]); 
        //if valid 
        current.completed = true
        this.setState({
            step:current.next,
            [this.state.step]:current
        });
    }

    handleChange(event, {name, value}) {
        let current = Object.assign({}, this.state[this.state.step]); 
        current.values[name] = value
        this.setState({[this.state.step]:current})
    }

    handleDayClick(day) {
        let current = Object.assign({}, this.state.date); 
        current.selectedDate = day;
        this.setState({
            date: current
        });
    }


    render() {
        let {step} = this.state;
        let hours = [];
        for(let i=1; i<13; i++) {
            hours.push({key:i, value:i, text:i});
        }
        let minutes = [];
        for(let i=0; i<60; i++) {
            minutes.push({key:i, value:i, text:i});
        }
        let ampm = [{key:'am', value:'am', text:'am'}, {key:'pm', value:'pm', text:'pm'}];

        return (
            <DocumentTitle title='Potluck - Create Event'>
            <Grid padded centered >
                <Grid.Row centered>
                    <Grid.Column textAlign="center" computer={8} tablet={10} mobile={16}>
                        <br />
                        <span className="title">Potluck</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column textAlign="center" computer={8} tablet={10} mobile={16}>
                        <span className="flavor">Create an Event</span>
                        <Step.Group>
                            <Step active={step === 'details'}>
                                <Icon name='list' />
                                <Step.Content title='Details'/>
                            </Step>
                        
                            <Step active={step === 'date'}>
                                <Icon name='calendar' />
                                <Step.Content title='Date'/>
                            </Step>
                        
                            <Step  active={step === 'confirm'}>
                                <Icon name='check' />
                                <Step.Content title='Confirm'/>
                            </Step>
                      </Step.Group>
                    </Grid.Column>
                </Grid.Row>
                {step === 'details' && <Grid.Row>
                    <Grid.Column computer={5} tablet={10} mobile={16} >
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Input name='name' label='Event Name' placeholder='Event Name' onChange={this.handleChange} required/>
                        <Form.Input name='description' label='Event Description' placeholder='Event Description'  onChange={this.handleChange} required/>
                        <Form.Input name='location' label='Event Location' placeholder='Event Location'  onChange={this.handleChange} required/>                    
                        <Button floated='right' type='submit'>Continue</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>}
                {step === 'date' && <Grid.Row>
                    <Grid.Column computer={5} tablet={10} mobile={16} >
                        <Form onSubmit={this.handleSubmit} size='mini'>
                            <Form.Field className="daypicker-form">
                                <label>Event Date</label>
                                <DayPicker onDayClick={this.handleDayClick} 
                                           fromMonth={new Date()}
                                           className="event-date-picker"
                                           />
                            </Form.Field>
                            <Form.Group inline>
                                <label>Start Time</label>
                                <Form.Select compact name='start_time-hours' options={hours} className="time-select"
                                                onChange={this.handleChange} required/>
                                <Form.Select compact name='start_time-mins' options={minutes} className="time-select"
                                                onChange={this.handleChange} required/>
                                <Form.Select compact name='start_time-noon' options={ampm} className="time-select"
                                                onChange={this.handleChange} required/>
                            </Form.Group>
                            <Form.Group inline>
                                <label>Duration</label>
                                <Form.Select compact name='duration-hours' options={hours} onChange={this.handleChange} required/>
                                <Form.Select compact name='duration-mins' options={minutes} onChange={this.handleChange} required/>                        
                            </Form.Group>
                            <Button floated='right' type='submit'>Continue</Button>
                        </Form>
                    </Grid.Column>
                </Grid.Row>}
                {step === 'confirm' && <Grid.Row>
                    <Grid.Column as={Form} computer={8} tablet={10} mobile={16}>
                        
                    </Grid.Column>
                </Grid.Row>}
            </Grid>
        </DocumentTitle>
        );
  }
}
export default EventCreate;