
import React, { PropTypes } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function SignupForm({ onSubmit, onChange, errors, user }) {
  return (
    <Form method="POST" action="/signup" onSubmit={onSubmit} style={{ textAlign: 'left' }}>
	 	<Form.Input name="firstname" label="First Name" placeholder="First Name" autoFocus onChange={onChange} value={user.firstname}/>
	 	<Form.Input name="lastname" label="Last Name" placeholder="Last Name" onChange={onChange} value={user.lastname}/>
      <Form.Input type="email" name="email" label="Email" placeholder="Email" onChange={onChange} value={user.email}/>
      <Form.Input type="password" name="password" label="Password" placeholder="Password" onChange={onChange} value={user.password}/>
      <Form.Input type="password" name="confirmpassword" label="Confirm Password" placeholder="Confirm Password" onChange={onChange} value={user.confirmpassword}/>
      <Form.Field style={{ textAlign: 'center' }}>
        <Button color="violet">Sign Up</Button>
      </Form.Field>
      {errors.summary && <div>{errors.summary}</div>}
    </Form>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
