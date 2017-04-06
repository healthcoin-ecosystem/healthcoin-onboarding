import React, { Component } from 'react';
import { Grid, Header, List, Divider, Button } from 'semantic-ui-react';
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

  componentDidMount() {
    document.body.classList.add('white', 'blob');
  }

  componentDidUnmount() {
    document.body.classList.remove('white', 'blob');
  }

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
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      );
    }

    return (
      <Grid columns="2" relaxed="very" stackable textAlign="center" verticalAlign="middle" style={{ marginTop: 64, marginBottom: 128 }}>
        <Grid.Row>
          <Grid.Column>
            <img src="/icon.png" alt="" style={{ width: 172, height: 172 }}/>
            <Header as="h1" style={{ marginTop: -10, fontSize: '280%' }}>Healthcoin</Header>
            <br/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 330 }}>
            <LoginForm
              onSubmit={this.handleSubmit.bind(this)}
              onChange={this.handleChange.bind(this)}
              errors={this.state.errors}
              user={this.state.user}
            />
          </Grid.Column>
          <Divider vertical>Or</Divider>
          <Grid.Column style={{ maxWidth: 330 }}>
            <Button as="a" href="/signup" color="teal" size="large" style={{ width: '50%' }}><i className="edit icon"></i> Sign Up</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
