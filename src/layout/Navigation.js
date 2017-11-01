import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Navigation extends Component {

    state = {} 

    handleItemClick = (e, { name }) => this.setState({ activeItem: name}) 

    render() {
        const { activeItem } = this.state 

        return (
            <Menu inverted>
                <Menu.Item 
                    name='logo'>
                    Logo
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item 
                        name='features'
                        active={ activeItem === 'features' }
                        onClick={this.handleItemClick}>
                        Features
                    </Menu.Item>
                    <Menu.Item 
                        name='register'
                        active={ activeItem === 'register' }
                        onClick={this.handleItemClick}>
                        Register
                    </Menu.Item>
                    <Menu.Item 
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
