import React, { Component } from 'react';
import { Grid, Header, List, Segment } from 'semantic-ui-react';
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

  componentDidMount() {
    document.body.classList.add('blob');
  }

  componentDidUnmount() {
    document.body.classList.remove('blob');
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
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 460 }}>
          <Segment raised style={{ padding: '32px 64px', marginTop: 64, marginBottom: 128 }}>
            <img src="/icon.png" alt="" style={{ width: 64, height: 64 }}/>
            <Header as="h1" color="teal">Healthcoin - Sign Up</Header>
            <SignupForm
              onChange={this.handleChange.bind(this)}
              errors={this.state.errors}
              user={this.state.user}
            />
            <List relaxed>
              <List.Item><a href="/login">Already have an account?</a></List.Item>
            </List>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
