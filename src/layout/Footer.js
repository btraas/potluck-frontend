import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Footer extends Component {
  render() {
    return (
        <div className="footer">
            <Menu inverted>
                <Menu.Item>Footer</Menu.Item>
            </Menu>
        </div>
    );
  }
}
export default Footer;