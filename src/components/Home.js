import React, { Component } from 'react';
import { Container, Grid, Icon, Button, Image } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import '../css/home.css';

class Home extends Component {
  render() {
    return (
        <Grid as={Container}>
          <Grid.Row divided className="home-section" textAlign='center' verticalAlign='middle'>
            <Grid.Column mobile={16} computer={8} tablet={8} >
                <Icon name="tablet" size="massive" fitted/>
                <Icon name="mobile" size="huge" fitted/>
                <br/>
                <Button>Apple Store</Button><Button>Google Store</Button>
            </Grid.Column>
            <Grid.Column mobile={16} computer={8} tablet={8}>
                <Button>Sign Up</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="home-section">
            <Grid.Column mobile={16} computer={6} tablet={6} textAlign='right' verticalAlign='middle'>
                <Image src="https://mobile-cuisine.com/wp-content/uploads/2017/01/potluck-fun-facts.jpg" circular/>
            </Grid.Column>
            <Grid.Column mobile={16} computer={10} tablet={10} textAlign='left' verticalAlign='middle'>
                <p>Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                    Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                    Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                </p>
                <p>Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                    Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                    Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay Loreum ipsum stuff okay 
                </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered textAlign='center' verticalAlign='middle'>
              <Button>Sign Up</Button>
          </Grid.Row>
        </Grid>
    );
  }
}

export default Home;
