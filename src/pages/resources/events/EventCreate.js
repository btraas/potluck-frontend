import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { Loader, Dimmer, Icon, Step, Grid, Form, Header, Button, Segment } from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import axios from 'axios';
import 'react-day-picker/lib/style.css';
import '../../../css/event.css';

class EventCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            step: 'details',
            details: { prev: '', next: 'date', completed: false, 
                values: {location:'', title:'',description:''}},
            date: { prev: 'details', next: 'confirm', completed: false, 
                values: { event_date: new Date(), start_time_hours:'', start_time_mins:'', start_time_noon:'', duration_hours:'', duration_mins:''}},
            confirm: { prev: 'date', next: '', completed: false }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.processRequestData = this.processRequestData.bind(this);
    }

    /**
     * Complete a step and move to next.
     * @param {*} event 
     */
    handleSubmit(event) {
        let current = Object.assign({}, this.state[this.state.step]); 
        const {step} = this.state;
        let completed = true;
        if(step !== 'confirm') {
            Object.values(current.values).map(item => {
                if(item === "") {
                    completed = false;
                }
            });
            if(this.state.step === 'date') {
                if(this.state.date.values.event_date === '') {
                    completed = false;
                }
            }
            if(completed) {
                current.completed = completed
                this.setState({
                    step:current.next,
                    [this.state.step]:current
                });
            } else {
                //TODO error message
            }
        } else {
            this.setState({loading:true})
            let data = this.processRequestData();
            let url = 'http://potluckapi.azurewebsites.net/api/Events';
            let options = {
                method:'POST', 
                headers: {
                    Authorization: `Bearer ${this.props.access}`,
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                data: data
            };
            axios.post(url, options)
                .then(response => {
                    
                })
        }
    }

    /**
     * Send users to the previous page.
     * @param {*} button click event 
     */
    handleClick(event) {
        const {step} = this.state;
        if(this.state[step].prev !== undefined) {
            this.setState({
                step:this.state[step].prev
            })
        }
    }

    handleChange(event, {name, value}) {
        let current = Object.assign({}, this.state[this.state.step]); 
        current.values[name] = value
        this.setState({[this.state.step]:current})
    }

    handleDayClick(day) {
        let current = Object.assign({}, this.state.date); 
        current.values.event_date = day;
        this.setState({
            date: current
        });
    }

    processRequestData() {
        const {title, location, description} = this.state.details.values;
        const times = this.state.date.values;
        let start = new Date(times.event_date.getTime());
        start.setMinutes(times.start_time_mins);        
        if(times.start_time_noon === 'am') {
            start.setHours(times.start_time_hours);
        } else {
            start.setHours(times.start_time_hours+12);
        }
        let end = new Date(start.getTime());
        end.setHours(times.duration_hours);
        end.setMinutes(times.duration_mins);
        let data = {
            title: title,
            location: location,
            description: description,
            startTime:start.toISOString(),
            endTime:end.toISOString(),
            organizerId:this.props.uid
        }
        return data;
    }

    render() {
        console.log(this.props)
        let {step} = this.state;
        let hours = [], dur_hours = [], minutes = [], dur_mins = [];        
        for(let i=1; i<13; i++) {
            let text = i < 10 ? `0${i}`:i
            hours.push({key:i, value:i, text:text});
            dur_hours.push({key:i, value:i, text:text+' hours'});   
        }
        for(let i=0; i<60; i++) {
            let text = i < 10 ? `0${i}`:i
            minutes.push({key:i, value:i, text:text});
            dur_mins.push({key:i, value:i, text:text+' mins'});
        }
        let ampm = [{key:'am', value:'am', text:'am'}, {key:'pm', value:'pm', text:'pm'}];

        const { details, date, loading } = this.state;
        return (
            <DocumentTitle title='Potluck - Create Event'>
            <Grid padded centered>
                <Dimmer active={loading}>
                    <Loader size="massive"/>
                </Dimmer>
                <Grid.Row centered>
                    <Grid.Column textAlign="center" computer={5} tablet={10} mobile={16}>
                        <br />
                        <span className="title">Potluck</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column textAlign="center" computer={5} tablet={10} mobile={16}>
                        <span className="flavor">Create an Event</span>
                        <Step.Group size='tiny'>
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

                {step === 'details' && <Grid.Row centered>
                    <Grid.Column computer={4} tablet={10} mobile={14} >
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Input name='title' label='Event Name:' placeholder='Event Name' 
                            defaultValue={details.values.title} onChange={this.handleChange} required/>
                        <Form.Input name='description' label='Event Description:' placeholder='Event Description' 
                            defaultValue={details.values.description} onChange={this.handleChange} required/>
                        <Form.Input name='location' label='Event Location:' placeholder='Event Location' 
                            defaultValue={details.values.location} onChange={this.handleChange} required/>                    
                        <Button icon='chevron right' labelPosition='right' content='Next' floated='right' type='submit'/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>}

                {step === 'date' && <Grid.Row centered>
                    <Grid.Column computer={4} tablet={10} mobile={14} >
                        <Form onSubmit={this.handleSubmit} size='mini'>
                            <Form.Field className="daypicker-form" required>
                                <label>Event Date:</label>
                                <DayPicker onDayClick={this.handleDayClick} 
                                    fromMonth={new Date()}
                                    className="event-date-picker"
                                    disabledDays={{before:new Date()}}
                                    selectedDays={date.values.event_date}
                                           />
                            </Form.Field>
                            <Form.Field required>
                                <label>Event Start Time:</label>
                                <Form.Group inline widths='equal'>
                                    <Form.Select compact name='start_time_hours' options={hours} className="time-select"
                                                    onChange={this.handleChange} placeholder="Hours" 
                                                    defaultValue={date.values.start_time_hours} required/>
                                    <span>:</span>
                                    <Form.Select compact name='start_time_mins' options={minutes} className="time-select"
                                                    onChange={this.handleChange} placeholder="Mins" 
                                                    defaultValue={date.values.start_time_mins} required/>
                                    <Form.Select compact name='start_time_noon' options={ampm} className="time-select"
                                                    onChange={this.handleChange} placeholder="am/pm" 
                                                    defaultValue={date.values.start_time_noon} required/>
                                </Form.Group>
                            </Form.Field>
                            <Form.Field required>
                                <label>Event Duration:</label>
                                <Form.Group inline widths='equal'>
                                    <Form.Select compact name='duration_hours' options={dur_hours} 
                                        defaultValue={date.values.duration_hours}
                                        onChange={this.handleChange} placeholder="Hours" required/>
                                    <Form.Select compact name='duration_mins' options={dur_mins} 
                                        defaultValue={date.values.duration_hours}
                                        onChange={this.handleChange} placeholder="Mins" required/>                        
                                </Form.Group>
                            </Form.Field>
                            <Button icon='chevron left' labelPosition='left' content='Back' floated='left' type="button" onClick={this.handleClick}/>
                            <Button icon='chevron right' labelPosition='right' content='Next' floated='right' type='submit'/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>}
                
                {step === 'confirm' && <Grid.Row centered>
                <Grid.Column computer={5} tablet={10} mobile={14} >
                    <Header>Event Summary:</Header>
                    <Segment>                        
                        <div>
                            <label>Title:</label> {details.values.title}   
                        </div>
                        <div>
                            <label>Description:</label>  {details.values.description}                                
                        </div>
                        <div>
                            <label>Location:</label>{details.values.location}   
                        </div>
                        <div>
                            <label>Date:</label>   {date.values.event_date.toDateString()}                               
                        </div>
                        <div>
                            <label>Time:</label>   
                            {`${date.values.start_time_hours}:${date.values.start_time_mins} ${date.values.start_time_noon}`}
                        </div>
                        <div>
                            <label>Duration:</label> {`${date.values.duration_hours} hours ${date.values.duration_mins} mins`} 
                        </div>
                    </Segment>
                    <Form.Group widths='equal'>
                        <Form.Field>
                        <Button icon='chevron left' labelPosition='left' content='Edit' type="button" onClick={this.handleClick}/>
                        <Button color='green' icon='chevron right' floated='right' labelPosition='right' onClick={this.handleSubmit}
                            content='Confirm' type='submit'/>                            
                        </Form.Field>
                    </Form.Group>
                    <br/>
                    <Button as={Link} to="/dashboard" style={{width:'100%'}}color='red'>Cancel</Button>
                </Grid.Column>
                </Grid.Row>}
            </Grid>
        </DocumentTitle>
        );
  }
}
export default EventCreate;