
import React, { PropTypes } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default function LoginForm({ onSubmit, onChange, errors, user }) {
  return (
    <Form method="POST" action="/auth/local" onSubmit={onSubmit} style={{ textAlign: 'left' }}>
      <Form.Input type="email" name="email" label="Email" autoFocus onChange={onChange} value={user.email}/>
      <Form.Input type="password" name="password" label="Password" onChange={onChange} value={user.password}/>
      <br/>
      <Form.Field>
        <Button color="violet" style={{ width: '50%' }}>Log In</Button>
        <a href="/recovery" style={{ marginLeft: 16 }}>Forgot Password</a>
      </Form.Field>
      {errors.summary && <div>{errors.summary}</div>}
    </Form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
