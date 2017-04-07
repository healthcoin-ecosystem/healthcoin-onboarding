import React, {Component, PropTypes} from "react"
import {browserHistory, Link} from 'react-router'
import _ from 'lodash'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Button, Form, Message, Segment, List} from 'semantic-ui-react'
import * as authActions from '../../actions/auth'
import {SIGN_UP_VALIDATORS} from '../../constants/form-validators'
import ErrorMessages from '../partials/error-messages'

import styles from './sign-up.css'
const logo = require('../../../images/logo-small.png')

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordAgain: ''
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

  componentWillMount() {
    const {currentUser} = this.props.auth
    if (!_.isEmpty(currentUser)) {
      browserHistory.push('/dashboard')
    }
  }

  componentDidUpdate() {
    const {error, currentUser} = this.props.auth
    if (!_.isEmpty(currentUser)) {
      browserHistory.push('/init')
    }
    if (_.isObject(error) && !_.has(this.state.errors, 'api')) {
      this.setState({
        errors: {
          api: 'The sign-up API call is failed.'
        }
      })
    }
  }

  handleSubmit = (e) => {
    const {user} = this.state;
    let invalid = false;
    let errors = {};
    _.forEach(user, (value, key) => {
      const validator = SIGN_UP_VALIDATORS[key]
      if (validator && !validator.isValid(value)) {
        errors[key] = validator.message;
        invalid = true
      }
    })

    if (user.password != user.passwordAgain) {
      errors.differentPasswords = 'Your passwords do not match';
      invalid = true
    }

    if (invalid) {
      this.setState({errors})
    } else {
      this.setState({step: 1, errors: {}})
    }
    e.preventDefault()
  }

  declineTc() {
    this.setState({step: 0, errors: {}})
    this.props.actions.clearErrorMessages()
  }

  acceptTc() {
    this.props.actions.signUp(this.state.user)
    this.props.actions.clearErrorMessages()
  }

  hasError() {
    return this.state.errors && (Object.keys(this.state.errors).length > 0)
  }

  render() {
    const {user, errors, step} = this.state || {}
    const {isProcessing} = this.props.auth

    // Error messages
    let errorMessages = []
    _.forEach(errors, (value) => {
      errorMessages.push(value)
    })
    const $errorMessages = <ErrorMessages header="Failed to sign up" errorMessages={errorMessages}></ErrorMessages>

    let $steps = []
    $steps.push((
      <div className={styles.basicInfo}>
        <div className={styles.basicInfoBg}></div>
        <Segment raised>
          <div className={styles.logo}>
            <img src={logo} title="Healthcoin Logo"></img>
            <h1 className="no-margin">Create Account</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className={styles.form}>
            <Form.Field>
              <Form.Input label="First Name"
                          error={!!errors.firstname}
                          value={user.firstname} placeholder='First Name'
                          onChange={this.updateField('firstname')}/>
            </Form.Field>
            <Form.Field>
              <Form.Input label="Last Name"
                          error={!!errors.lastname}
                          value={user.lastname} placeholder='Last Name'
                          onChange={this.updateField('lastname')}/>
            </Form.Field>
            <Form.Field>
              <Form.Input label="Email"
                          error={!!errors.email}
                          value={user.email} placeholder='Email'
                          icon='mail' iconPosition='left'
                          onChange={this.updateField('email')}/>
            </Form.Field>
            <Form.Field>
              <Form.Input label="Password"
                          error={!!errors.password}
                          type="password" placeholder='Password'
                          icon='lock' iconPosition='left'
                          value={user.password}
                          onChange={this.updateField('password')}/>
            </Form.Field>
            <Form.Field>
              <Form.Input label="Password Again"
                          error={!!errors.passwordAgain}
                          type="password" placeholder='Password Again'
                          icon='lock' iconPosition='left'
                          value={user.passwordAgain}
                          onChange={this.updateField('passwordAgain')}/>
            </Form.Field>
            {this.hasError() && $errorMessages}
            <Form.Field className="clearfix">
              <Link to="/sign-in">
                <Button>Back</Button>
              </Link>
              <Button color='violet' className="float-right no-margin" type="submit" loading={isProcessing}>Create
                Account
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </div>
    ))

    $steps.push((
      <div className={styles.tc}>
        <div className={styles.tcBg}></div>
        <Segment raised>
          <div className={styles.tcContent}>
            <h1 className="text-center">Terms & Conditions</h1>
            <div className={styles.tcText}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.</p>
            </div>
            {this.hasError() && $errorMessages}
            <div className="text-center clearfix">
              <Button onClick={this.declineTc.bind(this)} floated="left">Decline</Button>
              <Button color='violet' onClick={this.acceptTc.bind(this)} floated="right">
                Accept
              </Button>
            </div>
          </div>
        </Segment>
      </div>
    ))

    return (
      <section className={styles.wrapper}>
        <div className={styles.content}>
          {$steps[step]}
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
)(SignUp)
