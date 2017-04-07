import React, {Component, PropTypes} from "react"
import {browserHistory, Link} from 'react-router'
import _ from 'lodash'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Segment, Button, Form, Input, Dropdown} from 'semantic-ui-react'
import * as profileActions from '../../actions/profile'
import {INIT_PROFILE_VALIDATORS} from '../../constants/form-validators'
import ErrorMessages from '../partials/error-messages'

import styles from './init.css'
const hands = require('../../../images/awesome-work.png')

class Init extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      currentUser: this.props.auth.currentUser
    }
  }

  updateField = (fieldName) => {
    return (event) => {
      let currentUser = this.state.currentUser
      currentUser[fieldName] = event.target.value
      this.setState({currentUser})
    }
  }

  componentWillMount() {
    const {currentUser} = this.props.auth
    if (_.isEmpty(currentUser)) {
      browserHistory.push('/')
    }
  }

  handleSubmit = (e) => {
    const {currentUser} = this.state
    let invalid = false;
    let errors = {};
    ['weight', 'height'].forEach(fieldName => {
      const validator = INIT_PROFILE_VALIDATORS[fieldName]
      if (validator && !validator.isValid(currentUser[fieldName])) {
        errors[fieldName] = validator.message;
        invalid = true
      }
    })

    if (invalid) {
      this.setState({errors})
    } else {
      this.props.actions.update(currentUser, this.props.auth.token)
      this.setState({step: 1, errors: {}})
    }
    e.preventDefault()
  }

  hasError() {
    return this.state.errors && (Object.keys(this.state.errors).length > 0)
  }

  render() {
    const {step, errors} = this.state || {}
    let $steps = []
    // Error messages
    let errorMessages = []
    _.forEach(errors, (value) => {
      errorMessages.push(value)
    })
    const $errorMessages = <ErrorMessages header="Failed to sign up" errorMessages={errorMessages}></ErrorMessages>
    $steps.push((
      <div>
        <div className={styles.header}>
          <h2>Enter Basic Bio Data</h2>
          <p>In order to get you set up we will need some baseline bio-data.</p>
        </div>
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <Form.Field>
            <label>Weight</label>
            <Input
              label={<Dropdown defaultValue='Lbs' options={[{ key: 'Lbs', text: 'Lbs', value: 'Lbs' }]} />}
              labelPosition='right'
              placeholder='195'
              onChange={this.updateField('weight')}/>
          </Form.Field>
          <Form.Field>
            <label>Height</label>
            <Input
              label={<Dropdown defaultValue='Feet/Inches' options={[{ key: 'Feet/Inches', text: 'Feet/Inches', value: 'Feet/Inches' }]} />}
              labelPosition='right'
              placeholder={`6'2"`}
              onChange={this.updateField('height')}/>
          </Form.Field>
          {this.hasError() && $errorMessages}
          <div className={styles.buttons}>
            <Form.Field>
              <Button>Back</Button>&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color='violet' type="submit">Let's Get Started!</Button>
            </Form.Field>
          </div>
        </Form>
      </div>
    ))
    $steps.push((
      <div>
        <div className={styles.header}>
          <h2>Awesome Work</h2>
        </div>
        <p className="text-left">Just for entering in your basic bio-data we went ahead and gave you two Healthcoins to
          start off with.</p>
        <p className="text-left">Now keep it up and enter in your basic bio-data for your Hb1AC, HDL, and blood pressure
          to earn even more coins.</p>
        <p className={styles.awesomeWorkImg}>
          <img src={hands} alt="Awesome Work"></img>
        </p>
        <div className={styles.buttons}>
          <Button>Back</Button>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/dashboard">
            <Button color='violet'>Let's Get Started!</Button>
          </Link>
        </div>
      </div>
    ))
    return (
      <section className={styles.wrapper}>
        <div className={styles.content}>
          <Segment raised>
            {$steps[step]}
          </Segment>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    auth: state.auth,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(profileActions, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)
