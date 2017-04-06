import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import * as client from '../client';
import DashboardPage from './DashboardPage';
import GroupPage from './GroupPage';
import GroupsPage from './GroupsPage';
import HistoryPage from './HistoryPage';
import LoginPage from './LoginPage';
import RecoverPage from './RecoverPage';
import ResetPage from './ResetPage';
import SignupPage from './SignupPage';
import WalletPage from './WalletPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <PrivateRoute path="/dashboard" component={DashboardPage}/>
          <PrivateRoute path="/groups/:id" component={GroupPage}/>
          <PrivateRoute path="/groups" component={GroupsPage}/>
          <PrivateRoute path="/history" component={HistoryPage}/>
          <PrivateRoute path="/wallet" component={WalletPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/recover" component={RecoverPage}/>
          <Route path="/reset" component={ResetPage}/>
          <Route path="/signup" component={SignupPage}/>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ component, ...rest }) {
  return (
    <Route {...rest} render={props => (
      client.isAuthenticated() ?
      React.createElement(component, props) :
      <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    )}/>
  );
}
