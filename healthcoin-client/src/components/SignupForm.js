
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Form } from 'formsy-semantic-ui-react';
import Recaptcha from './Recaptcha';

const errorLabel = <div style={{ color: '#db2828', marginTop: '-1em', textAlign: 'right', fontSize: '80%' }}/>;

export default class SignupForm extends Component {
  render() {
    return (
      <Form
        method="POST"
        action="/signup"
        onValidSubmit={this.props.onSubmit}
        style={{ textAlign: 'left' }}
      >
        <Form.Input
          required
          name="firstname"
          label="First Name"
          autoFocus
          onChange={this.props.onChange}
          value={this.props.user.firstname}
          errorLabel={errorLabel}
          maxLength="80"
          validationErrors={{
            isDefaultRequiredValue: 'First Name is required'
          }}
        />
        <Form.Input
          required
          name="lastname"
          label="Last Name"
          onChange={this.props.onChange}
          value={this.props.user.lastname}
          errorLabel={errorLabel}
          maxLength="80"
          validationErrors={{
            isDefaultRequiredValue: 'Last Name is required',
          }}
        />
        <Form.Input
          required
          type="email"
          name="email"
          label="Email"
          onChange={this.props.onChange}
          value={this.props.user.email}
          errorLabel={errorLabel}
          validations={{ isEmail: true }}
          maxLength="253"
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
          validations={{ minLength: 8 }}
          maxLength="32"
          validationErrors={{
            isDefaultRequiredValue: 'Password is required',
            minLength: 'Minimum 8 characters'
          }}
        />
        <Form.Input
          required
          type="password"
          name="confirmpassword"
          label="Confirm Password"
          onChange={this.props.onChange}
          value={this.props.user.confirmpassword}
          errorLabel={errorLabel}
          validations={{ minLength: 8 }}
          maxLength="32"
          validationErrors={{
            isDefaultRequiredValue: 'Confirm Password is required',
            minLength: 'Minimum 8 characters'
          }}
        />
        <br/>
        <Form.Field>
          <Recaptcha/>
        </Form.Field>
        <br/>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button color="violet" style={{ width: '50%' }}>Sign Up</Button>
        </Form.Field>
        <br/>
      </Form>
    );
  }
}
