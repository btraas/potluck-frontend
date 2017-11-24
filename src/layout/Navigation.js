import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../css/navi.css';

import 'semantic-ui-css/semantic.min.css';

class Navigation extends Component {

    state = { activeItem: '' } 

    handleItemClick = (e, { name }) => this.setState({ activeItem: name}) 
    handleLogout = (e, {name}) => {
        let url = 'http://potluckapi.azurewebsites.net/connect/logout';
        let headers = new Headers();
        let options = {
            method:'POST'
        };
        headers.append('Accept', 'text/html');
        headers.append('Authorization', 'Bearer ' + this.props.access);
        /*fetch(url, options)
            .then()
            .catch();*/
    }

    render() {
        const { activeItem } = this.state 

        return (
            <Menu fluid inverted color={'olive'} size='huge' className='naviMenu'>
                <Menu.Item
                    className='navipadding'
                    as={Link}
                    to="/"
                    name='home'
                    active={ activeItem === 'features' }
                    onClick={this.handleItemClick}>

                    PotLuck
                </Menu.Item>
                <Menu.Menu position='right' className='naviRightPadding'>
                    { !this.props.isAuthenticated && <Menu.Item 
                        as={Link}
                        to="/register"
                        name='register'
                        active={ activeItem === 'register' }
                        onClick={this.handleItemClick}>
                        Register
                    </Menu.Item>}
                    { !this.props.isAuthenticated && <Menu.Item 
                        as={Link}
                        to="/login"
                        name='login'
                        active={ activeItem === 'login' }
                        onClick={this.handleItemClick}>
                        Login
                    </Menu.Item> }
                    { this.props.isAuthenticated && <Menu.Item 
                        name='account'
                        active={ activeItem === 'account' }
                        onClick={this.handleItemClick}>
                        Account
                    </Menu.Item>}
                    { this.props.isAuthenticated && <Menu.Item 
                        name='logout'
                        active={ activeItem === 'logout' }
                        onClick={this.handleItemClick}>
                        Logout
                    </Menu.Item>}
                </Menu.Menu>
            </Menu>
        );
  }
}
export default Navigation;