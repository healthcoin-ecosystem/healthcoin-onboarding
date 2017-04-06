import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <Menu fixed="left" size="large" pointing secondary vertical style={{
            top: 79, backgroundColor: 'white', position: 'absolute', paddingTop: 16, borderRight: 'none'
          }}>
          <NavLink className="item" to="/dashboard">Dashboard</NavLink>
          <NavLink className="item" to="/wallet">Coins</NavLink>
          <NavLink className="item" to="/history">Bio-Data History</NavLink>
          <NavLink className="item" to="/groups">Groups</NavLink>
          <Menu.Item><Button fluid>Add Bio-Data</Button></Menu.Item>
        </Menu>
      </nav>
    );
  }
}
