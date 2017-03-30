import React, { Component } from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import * as client from '../client';
import LoginForm from './LoginForm';

export default class LoginPage extends Component {
  state = {
    errors: {},
    user: {
      email: '',
      password: ''
    },
    redirectToReferrer: false
  };

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state.user;

    client.login(email, password, err => {
      if (err) { return this.setState({ errors: err }); }

      this.setState({ errors: {}, redirectToReferrer: true });
    });
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      );
    }

    return (
      <Grid textAlign="center" verticalAlign="middle" style={{ height: '100%' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <img src="//healthcoin.com/wallet/images/Icon.png" alt="" style={{ width: 128, height: 128 }}/>
          <Header as="h1" color="teal">Healthcoin - Log In</Header>
          <LoginForm
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
            errors={this.state.errors}
            user={this.state.user}
          />
          <List relaxed>
            <List.Item><a href="/signup">Sign Up</a></List.Item>
            <List.Item><a href="/recovery">Lost Password</a></List.Item>
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}
