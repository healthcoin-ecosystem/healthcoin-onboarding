import React, {Component, PropTypes} from "react"
import {browserHistory, Link} from 'react-router'
import _ from 'lodash'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Form, Image, Segment} from 'semantic-ui-react'
import * as authActions from '../../actions/auth'
import {SIGN_IN_VALIDATORS} from '../../constants/form-validators'
import ErrorMessages from '../partials/error-messages'

import styles from './sign-in.css'

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }, errors: {}
    };
  }

  updateField = (fieldName) => {
    return (event) => {
      let user = this.state.user
      user[fieldName] = event.target.value
      this.setState({user})
    }
  }

  componentDidUpdate() {
    const {error, token, currentUser} = this.props.auth
    if (token && (currentUser.roles || []).find(role => role === 'admin')) {
      browserHistory.push('/admin')
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
        <Segment raised>
          <div className={styles.content}>
            <div className="text-center">
              <Image
                className={styles.logo}
                src="../../../images/logo.png"
                alt="Healthcoin Logo"></Image>
              <h1 id={styles.greeting}>Welcome Back</h1>
            </div>
            <Form onSubmit={this.handleSubmit}>
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
              <Form.Field className="clearfix" id={styles.actions}>
                <Button color='violet' type="submit" loading={isProcessing}>Login</Button>
                <a href="" className="float-right">Forgot password</a>
              </Form.Field>
            </Form>
          </div>
        </Segment>
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
