import React, {Component, PropTypes} from "react"
import {browserHistory, Link} from 'react-router'
import _ from 'lodash'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Form, Divider} from 'semantic-ui-react'
import * as authActions from '../../actions/auth'
import {SIGN_IN_VALIDATORS} from '../../constants/form-validators'
import ErrorMessages from '../partials/error-messages'

import styles from './sign-in.css'
const logo = require('../../../images/logo.png')

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {user: {
      email: '',
      password: ''
    }, errors: {}};
  }

  updateField = (fieldName) => {
    return (event) => {
      let user = this.state.user
      user[fieldName] = event.target.value
      this.setState({user})
    }
  }

  componentDidMount() {
    const { token } = this.props.auth;
    if (token) {
      browserHistory.push('/dashboard')
    }
  }

  componentDidUpdate() {
    const {error, token, currentUser} = this.props.auth;
    if (token) {
      // if((currentUser.roles || []).find(role => role === 'admin')) {
      //   browserHistory.push('/admin')
      // }
      // else {
        browserHistory.push('/dashboard')
      // }
    }
    if (_.isObject(error) && !_.has(this.state.errors, 'api')) {
      this.setState({
        errors: {
          api: 'Authentication failed.'
        }
      })
    }
  }

  handleSubmit = (e) => {
    const {user} = this.state;
    let invalid = false;
    let errors = {};
    _.forEach(user, (value, key) => {
      const validator = SIGN_IN_VALIDATORS[key]
      if (validator && !validator.isValid(value)) {
        errors[key] = validator.message;
        invalid = true
      }
    })
    if (invalid) {
      this.setState({errors})
    } else {
      this.props.actions.signIn(user);
    }
    e.preventDefault();
  }

  hasError() {
    return this.state.errors && (Object.keys(this.state.errors).length > 0)
  }

  render() {
    const {user, errors} = this.state || {}
    const {isProcessing} = this.props.auth

    // Error messages
    let errorMessages = []
    _.forEach(errors, (value, key) => {
      errorMessages.push(value)
    })
    const $errorMessages = <ErrorMessages header="Failed to sign in" errorMessages={errorMessages}></ErrorMessages>

    return (
      <section className={styles.wrapper}>
        <div className={styles.bg}></div>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src={logo} alt="Healthcoin Logo"></img>
            <h1 className={styles.siteName}>Healthcoin</h1>
          </div>
          <div className={styles.formArea}>
            <Form onSubmit={this.handleSubmit} className={styles.form}>
              <Form.Field>
                <Form.Input label="Email"
                            value={user.email} placeholder='Email'
                            icon='mail' iconPosition='left'
                            error={!!errors.email}
                            onChange={this.updateField('email')}/>
              </Form.Field>
              <Form.Field>
                <Form.Input label="Password"
                            type="password" placeholder='Password'
                            icon='lock' iconPosition='left'
                            error={!!errors.password}
                            value={user.password}
                            onChange={this.updateField('password')}/>
              </Form.Field>
              {this.hasError() && $errorMessages}
              <Form.Field className="clearfix">
                <Button color='violet' type="submit" loading={isProcessing}>Login</Button>
                <a href="" className={styles.forgotPasswordLink}>Forgot password</a>
              </Form.Field>
            </Form>
            <Divider vertical>Or</Divider>
            <div className={styles.signUpButton}>
              <Link to={`/sign-up`}>
                <Button color='violet' size='big' content='Sign Up' icon='edit' labelPosition='left'/>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authActions, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
