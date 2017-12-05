import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Footer extends Component {
  render() {
    return (
        <Menu inverted className="footer">
            <Menu.Item>Copyright 2017 Medhat and Friends</Menu.Item>
        </Menu>
    );
  }
}
export default Footer;