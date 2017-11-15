import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

class Navigation extends Component {

    state = { activeItem: '' } 

    handleItemClick = (e, { name }) => this.setState({ activeItem: name}) 

    render() {
        const { activeItem } = this.state 

        return (
            <Menu fluid inverted>
                <Menu.Item
                    as={Link}
                    to="/"
                    name='home'
                    active={ activeItem === 'features' }
                    onClick={this.handleItemClick}>
                    Logo
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item 
                        as={Link}
                        to="/register"
                        name='register'
                        active={ activeItem === 'register' }
                        onClick={this.handleItemClick}>
                        Register
                    </Menu.Item>
                    <Menu.Item 
                        as={Link}
                        to="/login"
                        name='login'
                        active={ activeItem === 'login' }
                        onClick={this.handleItemClick}>
                        Login
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
  }
}
export default Navigation;