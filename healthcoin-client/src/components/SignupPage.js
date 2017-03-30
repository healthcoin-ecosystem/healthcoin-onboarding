import React, { Component } from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import * as client from '../client';
import SignupForm from './SignupForm';

export default class SignupPage extends Component {
  state = {
    errors: {},
    user: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: ''
    }
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
    return (
      <Grid textAlign="center" verticalAlign="middle" style={{ height: '100%', marginBottom: 128 }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <img src="//healthcoin.com/wallet/images/Icon.png" alt="" style={{ width: 128, height: 128 }}/>
          <Header as="h1" color="teal">Healthcoin - Sign Up</Header>
          <SignupForm
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
            errors={this.state.errors}
            user={this.state.user}
          />
          <List relaxed>
            <List.Item><a href="/login">Already have an account?</a></List.Item>
          </List>
        </Grid.Column>
      </Grid>
    );
  }
}
