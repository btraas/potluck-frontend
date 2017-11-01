import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Footer extends Component {
  render() {
    return (
        <Grid as={Container}>
            <Grid.Row>
                Footer
            </Grid.Row>
        </Grid>
    );
  }
}

export default Footer;
