import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import * as client from '../client';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div style={{display: 'none'}}>
            <AuthButton/>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/protected">Dashboard</Link></li>
            </ul>
          </div>
          <Route path="/public" component={Public}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
          <PrivateRoute path="/protected" component={Protected}/>
        </div>
      </Router>
    );
  }
}

const AuthButton = withRouter(({ history }) => (
  client.isAuthenticated() ? (
    <p>
      Welcome! <button onClick={() => {
        client.logout(() => history.push('/public'))
      }}>Log out</button>
    </p>
  ) : (
    <span></span>
  )
));

function PrivateRoute({ component, ...rest }) {
  return (
    <Route {...rest} render={props => (
      client.isAuthenticated() ?
      React.createElement(component, props) :
      <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    )}/>
  );
}
