import React, { Component } from 'react';
import { Grid, Button, Image, Divider, Header } from 'semantic-ui-react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import '../css/home.css';

class Home extends Component {
  render() {
    return (
        <DocumentTitle title='Potluck'>
        <Grid padded id="home-container">
            <Grid.Row className="home-section" centered>
                <Grid.Column mobile={16} computer={8} tablet={10} textAlign="center" verticalAlign="middle">
                    <Header>Potluck</Header>
                    <Header>Organizing a party should be easy</Header>
                    <Divider horizontal>It is.</Divider>
                    <Header>Sign up with Potluck and start organizing.</Header>
                    <Button as={Link} to="/register">Sign Up</Button>
                    <div>Already registered? <Link to="/login">Log in.</Link></div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className="home-section" verticalAlign="middle">
                <Grid.Column mobile={16} computer={8} tablet={8}>
                    <Image />
                    Image goes here.
                </Grid.Column>
                <Grid.Column mobile={16} computer={8} tablet={8} textAlign="center">
                    <Header>"Simple. Clean. Just works like Magic."</Header>
                    <Divider />
                    <div>
                        <p>Make an invite.</p>
                        <p>Send out an event.</p>
                        <p>Pledge your dishes.</p>
                        <p><b>Host your event.</b></p>
                    </div>
                    <Divider />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className="home-section" verticalAlign="middle" textAlign="center">
                <Grid.Column mobile={16} computer={8} tablet={8}>
                    <Header>Take it on the go.</Header>
                    <Divider/>
                    <p>Pledge and keep track of your events on your mobile device with our mobile apps.</p>
                    <Divider/>
                </Grid.Column>
                <Grid.Column mobile={16} computer={8} tablet={8}>
                    <Image wrapped src="icons/google-play-badge.png" size="small" onClick={(e)=>window.location.href="https://play.google.com/store"}/>
                    <Image wrapped src="icons/apple-store-badge.svg" onClick={(e)=>window.location.href="https://www.apple.com/ca/"}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row className="home-section" centered>
                <Grid.Column mobile={16} computer={8} tablet={10} textAlign="center" verticalAlign="middle">
                    <Header>Free to use.</Header>
                    <Divider/>
                        <Header>Free to try.</Header>
                    <Divider/>
                    <Header>Sign up with Potluck and start organizing now.</Header>
                    <Button as={Link} to="/register">Sign Up</Button>
                    <div>Already registered? <Link to="/login">Log in.</Link></div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default Home;
