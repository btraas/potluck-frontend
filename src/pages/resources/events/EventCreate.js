import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import { Loader, Dimmer, Icon, Step, Grid, Form, Header, Button, Segment, Modal, Container } from 'semantic-ui-react';
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
            details: {
                prev: '', next: 'date', completed: false,
                values: { location: '', title: '', description: '' }
            },
            date: {
                prev: 'details', next: 'confirm', completed: false,
                values: { event_date: new Date(), start_time_hours: '', start_time_mins: '', start_time_noon: '', duration_hours: '', duration_mins: '' }
            },
            confirm: { prev: 'date', next: '', completed: false },
            openModal: false,
            success: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.processRequestData = this.processRequestData.bind(this);

    }

    /**
     * Complete a step and move to next.
     * @param {*} event 
     */
    handleSubmit(event) {
        let current = Object.assign({}, this.state[this.state.step]);
        const { step } = this.state;
        let completed = true;
        if (step !== 'confirm') {
            Object.values(current.values).map(item => {
                if (item === "") {
                    completed = false;
                }
            });
            if (this.state.step === 'date') {
                if (this.state.date.values.event_date === '') {
                    completed = false;
                }
            }
            if (completed) {
                current.completed = completed
                this.setState({
                    step: current.next,
                    [this.state.step]: current
                });
            } else {
                //TODO error message
            }
        } else {
            this.setState({ loading: true })
            let data = this.processRequestData();
            let url = 'https://potluckapi.azurewebsites.net/api/Events';
    
            axios({
                url: "https://potluckapi.azurewebsites.net/api/Events",
                method: "post",
                headers: {
                    Authorization: `Bearer ${this.props.access}`,
                    'Content-Type': 'application/json',
                },
                data: data
            }).then(response => {
                // If event is successfully created
                this.setState({ openModal: true, success: response.status === 201 })
            }).catch(e => {
                console.log(e)
                this.setState({ openModal: true, success: false })
            })
        }
    }

    /**
     * Send users to the previous page.
     * @param {*} button click event 
     */
    handleClick(event) {
        const { step } = this.state;
        if (this.state[step].prev !== undefined) {
            this.setState({
                step: this.state[step].prev
            })
        }
    }

    handleChange(event, { name, value }) {
        let current = Object.assign({}, this.state[this.state.step]);
        current.values[name] = value
        this.setState({ [this.state.step]: current })
    }

    handleDayClick(day) {
        let current = Object.assign({}, this.state.date);
        current.values.event_date = day;
        this.setState({
            date: current
        });
    }

    /**
     *
     */
    handleModalClose() {
        this.setState({ openModal: false })

        // Route back to the dashboard if success
        if (this.state.success) {
            this.props.history.push('/dashboard')
        }
    }

    processRequestData() {
        const { title, location, description } = this.state.details.values;
        const times = this.state.date.values;
        let start = new Date(times.event_date.getFullYear(), times.event_date.getMonth(), times.event_date.getDate());
        let end = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        
        start.setMinutes(times.start_time_mins);
        end.setMinutes(times.start_time_mins + times.duration_mins);
        
        if (times.start_time_noon === 'am') {
            start.setUTCHours(times.start_time_hours);
            end.setUTCHours(times.duration_hours+times.start_time_hours);
        } else {
            start.setUTCHours(times.start_time_hours + 12);
            end.setUTCHours(times.duration_hours+times.start_time_hours + 12);
        }
        
        let data = {
            title: title,
            location: location,
            description: description,
            startTime: start.toISOString(),
            endTime: end.toISOString(),
            organizerId: this.props.uid
        }
        return data;
    }

    render() {
        let { step } = this.state;
        let hours = [], dur_hours = [], minutes = [], dur_mins = [];
        for (let i = 1; i < 13; i++) {
            let text = i < 10 ? `0${i}` : i
            hours.push({ key: i, value: i, text: text });
            dur_hours.push({ key: i, value: i, text: text + ' hours' });
        }
        for (let i = 0; i < 60; i++) {
            let text = i < 10 ? `0${i}` : i
            minutes.push({ key: i, value: i, text: text });
            dur_mins.push({ key: i, value: i, text: text + ' mins' });
        }
        let ampm = [{ key: 'am', value: 'am', text: 'am' }, { key: 'pm', value: 'pm', text: 'pm' }];

        const { details, date, loading, openModal } = this.state;
        return (
            <DocumentTitle title='Potluck - Create Event'>
                <Grid padded centered id="event-create-page">
                    <Dimmer active={loading}>
                        <Loader size="massive" />
                    </Dimmer>
                    <Grid.Row centered>
                        <Grid.Column textAlign="center" computer={5} tablet={10} mobile={12}>
                            <br />
                            <span className="title">Potluck</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        {/*<Grid.Column textAlign="center" computer={5} tablet={10} mobile={12}>*/}
                        <Grid.Column textAlign="center" computer={10} tablet={10} mobile={12}>
                            <span className="flavor">Create an Event</span>
                            <Step.Group size='tiny' className="unstackable">
                                <Step active={step === 'details'}>
                                    <Icon name='list' />
                                    <Step.Content title='Details' />
                                </Step>

                                <Step active={step === 'date'}>
                                    <Icon name='calendar' />
                                    <Step.Content title='Date' />
                                </Step>

                                <Step active={step === 'confirm'}>
                                    <Icon name='check' />
                                    <Step.Content title='Confirm' />
                                </Step>
                            </Step.Group>
                        </Grid.Column>
                    </Grid.Row>

                    {step === 'details' && <Grid.Row centered>
                        <Grid.Column computer={4} tablet={10} mobile={14} >
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input name='title' label='Event Name:' placeholder='Event Name'
                                    defaultValue={details.values.title} onChange={this.handleChange} required />
                                <Form.Input name='description' label='Event Description:' placeholder='Event Description'
                                    defaultValue={details.values.description} onChange={this.handleChange} required />
                                <Form.Input name='location' label='Event Location:' placeholder='Event Location'
                                    defaultValue={details.values.location} onChange={this.handleChange} required />
                                <Button icon='chevron right' labelPosition='right' content='Next' floated='right' type='submit' />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>}

                    {step === 'date' && <Grid.Row centered>
                        <Grid.Column computer={4} tablet={10} mobile={14} >
                            <Form onSubmit={this.handleSubmit} size='mini'>
                                <Form.Field required>
                                    <label>Event Date:</label>
                                    <div className="daypicker-form" >
                                        <DayPicker onDayClick={this.handleDayClick}
                                            fromMonth={new Date()}
                                            className="event-date-picker"
                                            disabledDays={{ before: new Date() }}
                                            selectedDays={date.values.event_date}
                                        />
                                    </div>
                                    
                                </Form.Field>
                                <Form.Field required>
                                    <label>Event Start Time:</label>
                                    <Form.Group inline widths='equal'>
                                        <Form.Select compact name='start_time_hours' options={hours} className="time-select"
                                            onChange={this.handleChange} placeholder="Hours"
                                            defaultValue={date.values.start_time_hours} required />
                                        <Form.Select compact name='start_time_mins' options={minutes} className="time-select"
                                            onChange={this.handleChange} placeholder="Mins"
                                            defaultValue={date.values.start_time_mins} required />
                                        <Form.Select compact name='start_time_noon' options={ampm} className="time-select"
                                            onChange={this.handleChange} placeholder="am/pm"
                                            defaultValue={date.values.start_time_noon} required />
                                    </Form.Group>
                                </Form.Field>
                                <Form.Field required>
                                    <label>Event Duration:</label>
                                    <Form.Group inline widths='equal'>
                                        <Form.Select compact name='duration_hours' options={dur_hours}
                                            defaultValue={date.values.duration_hours} className="time-select"
                                            onChange={this.handleChange} placeholder="Hours" required />
                                        <Form.Select compact name='duration_mins' options={dur_mins}
                                            defaultValue={date.values.duration_hours} className="time-select"
                                            onChange={this.handleChange} placeholder="Mins" required />
                                    </Form.Group>
                                </Form.Field>
                                <Button icon='chevron left' labelPosition='left' content='Back' floated='left' type="button" onClick={this.handleClick} />
                                <Button icon='chevron right' labelPosition='right' content='Next' floated='right' type='submit' />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>}

                    {step === 'confirm' && <Grid.Row centered>
                        <Grid.Column computer={5} tablet={10} mobile={14} >
                            <label>Event Summary:</label>
                            <Segment className="event-summary">
                                <div>
                                    <label className="secondary-label">Title:  {details.values.title}</label>
                                </div>
                                <div>
                                    <label className="secondary-label">Description:  {details.values.description}</label>
                                </div>
                                <div>
                                    <label className="secondary-label">Location:  {details.values.location}</label>
                                </div>
                                <div>
                                    <label className="secondary-label">Date:  {date.values.event_date.toDateString()}</label>
                                </div>
                                <div>
                                    <label className="secondary-label">Time:  {`${date.values.start_time_hours}:${date.values.start_time_mins < 10 
                                        ? '0'+date.values.start_time_mins : date.values.start_time_mins} ${date.values.start_time_noon}`}</label>
                                </div>
                                <div>
                                    <label className="secondary-label">Duration:  {`${date.values.duration_hours} hours ${date.values.duration_mins} mins`}</label>
                                </div>
                            </Segment>
                            <Form>
                            <Form.Group inline widths='equal'>
                                <Form.Button className="equal-inline" icon='chevron left' labelPosition='left'
                                    content='Edit' type="button" onClick={this.handleClick}/>
                                <Form.Button content="Confirm" className="equal-inline" color='green' icon='chevron right' 
                                    floated='right' labelPosition='right' onClick={this.handleSubmit} type='submit'/>
                            </Form.Group>
                            </Form>
                            <br />
                            <Button as={Link} to="/dashboard" style={{ width: '100%' }} color='red'>Cancel</Button>
                        </Grid.Column>
                    </Grid.Row>}
                    <Modal size="tiny" open={openModal}>
                        <Modal.Header>
                            { this.state.success? "Success" : "Failed" }
                        </Modal.Header>
                        <Modal.Content>
                            <p>
                            { this.state.success ?
                                "Successfully created the Event." : 
                                "An error occured while creating the event."
                            }
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button positive icon='checkmark' labelPosition='right' content='Ok' onClick={this.handleModalClose} />
                        </Modal.Actions>
                    </Modal>
                </Grid>
            </DocumentTitle>
        );
    }
}
export default EventCreate;
