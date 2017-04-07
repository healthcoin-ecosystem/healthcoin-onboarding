
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';

const errorLabel = <div style={{ color: '#db2828', marginTop: '-1em', textAlign: 'right', fontSize: '80%' }}/>;

export default class LoginForm extends Component {
  state = {};

  enableButton() {

  }

  disableButton() {

  }

  render() {
    return (
      <Form
        method="POST"
        action="/auth/local"
        style={{ textAlign: 'left' }}
        onValid={this.enableButton.bind(this)}
        onInvalid={this.disableButton.bind(this)}
        onValidSubmit={this.props.onSubmit}
      >
        <Form.Input
          required
          type="email"
          name="email"
          label="Email"
          autoFocus
          onChange={this.props.onChange}
          value={this.props.user.email}
          errorLabel={errorLabel}
          validations="isEmail"
          validationErrors={{
            isEmail: 'This is not a valid email',
            isDefaultRequiredValue: 'Email is required',
          }}
        />
        <Form.Input
          required
          type="password"
          name="password"
          label="Password"
          onChange={this.props.onChange}
          value={this.props.user.password}
          errorLabel={errorLabel}
          validationErrors={{
            isDefaultRequiredValue: 'Password is required',
          }}
        />
        <br/>
        <Form.Field>
          <Button color="violet" style={{ width: '50%' }}>Log In</Button>
          <a href="/recovery" style={{ marginLeft: 16 }}>Forgot Password</a>
        </Form.Field>
      </Form>
    );
  }
}
