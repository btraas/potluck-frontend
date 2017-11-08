import React, { Component } from 'react';
import { Container, Grid, Icon, Button, Image, Divider } from 'semantic-ui-react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import '../css/home.css';

class Home extends Component {
  render() {
    return (
        <DocumentTitle title='Potluck'>
        <Grid padded>
            <Grid.Row className="home-section" textAlign='center' verticalAlign='middle'>
            <Grid.Column mobile={16} computer={8} tablet={8}>
                <Icon name="tablet" size="massive" fitted/>
                <Icon name="mobile" size="huge" fitted/>
                <br/>
                <Image wrapped src="icons/google-play-badge.png" size="small" onClick={(e)=>window.location.href="https://play.google.com/store"}/>
                <Image wrapped src="icons/apple-store-badge.svg" onClick={(e)=>window.location.href="https://www.apple.com/ca/"}/>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8} tablet={8}>
                <Button as={Link} to="/register">Sign Up</Button>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row as={Divider}></Grid.Row>
            <Grid.Row className="home-section" centered>
            <Grid.Column mobile={16} computer={6} tablet={6} textAlign='center' verticalAlign='middle'>
                <Image centered width={300} height={300} src="https://static1.squarespace.com/static/57eafb16579fb318fd0f720e/t/580547abf7e0ab69aef845af/1476741036464/IMG_0095.JPG"/>
            </Grid.Column>
            <Grid.Column mobile={16} computer={10} tablet={10} textAlign='left' verticalAlign='middle'>
                <Container text>
                    <p>Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                        Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                        Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                    </p>
                    <p>Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                        Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                        Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                    </p>
                </Container>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row centered textAlign='center' verticalAlign='middle'>
                <Button as={Link} to="/register">Sign Up</Button>   
            </Grid.Row>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default Home;
