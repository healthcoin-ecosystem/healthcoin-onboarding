
import React, { PropTypes } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Recaptcha from './Recaptcha';

export default function SignupForm({ onSubmit, onChange, errors, user }) {
  return (
    <Form method="POST" action="/signup" onSubmit={onSubmit} style={{ textAlign: 'left' }}>
	 	<Form.Input name="firstname" label="First Name" autoFocus onChange={onChange} value={user.firstname}/>
	 	<Form.Input name="lastname" label="Last Name" onChange={onChange} value={user.lastname}/>
      <Form.Input type="email" name="email" label="Email" onChange={onChange} value={user.email}/>
      <Form.Input type="password" name="password" label="Password" onChange={onChange} value={user.password}/>
      <Form.Input type="password" name="confirmpassword" label="Confirm Password" onChange={onChange} value={user.confirmpassword}/>
      <br/>
      <Form.Field>
        <Recaptcha/>
      </Form.Field>
      <br/>
      <Form.Field style={{ textAlign: 'center' }}>
        <Button color="violet" style={{ width: '50%' }}>Sign Up</Button>
      </Form.Field>
      <br/>
      {errors.summary && <div>{errors.summary}</div>}
    </Form>
  );
}

SignupForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
