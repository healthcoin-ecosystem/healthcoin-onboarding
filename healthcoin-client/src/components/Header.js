import React, { Component } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as client from '../client';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Menu borderless style={{ zIndex: 102 }}>
          <Menu.Item header>
            <img src="//healthcoin.com/wallet/images/Icon.png" alt="" style={{ width: 58, height: 58 }}/>
            <span style={{ fontSize: '140%', marginLeft: 10 }}>Healthcoin</span>
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item text={'Hi, ' + client.getUser().firstname} style={{ fontWeight: 'bold' }}>
              <Dropdown.Menu>
                <LogoutDropdownItem/>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </header>
    );
  }
}

const LogoutDropdownItem = withRouter(({ history }) => (
  <Dropdown.Item onClick={() => client.logout(() => history.push('/login'))}>
    Log Out
  </Dropdown.Item>
));
