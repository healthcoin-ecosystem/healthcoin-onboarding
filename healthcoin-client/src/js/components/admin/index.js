import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from './sidebar'
import {Button, Card, Image, Modal, Header, List, Segment, Dropdown, Radio} from 'semantic-ui-react'

import styles from './index.css'

class Dashboard extends Component {

  componentWillMount() {
    if (!this.props.auth.token ||
        !(this.props.auth.currentUser.roles || []).find(role => role === 'admin')) {
      browserHistory.push('/admin/sign-in')
    }
    browserHistory.push('/admin/groups')
  }

  render() {
    const {currentUser} = this.props.auth
    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <div className={styles.content + " clearfix"}>
          <Sidebar page="dashboard"></Sidebar>
          <div className={styles.dashboard}>
            <Segment>
              
            </Segment>
          </div>
        </div>
      </div>
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
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
