import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from '../partials/sidebar'
import RewardsCard from './rewards-card'
import PerformanceCard from './performance-card'
import BadgesCard from './badges-card'
import {Button, Card, Image, Modal, Header, List} from 'semantic-ui-react'

import styles from './index.css'

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.auth.token) {
      browserHistory.push('/sign-in')
    }
  }

  render() {
    const {currentUser} = this.props.auth
    
    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <div className={styles.progress}>
          3 Bio-data entries are needed for your next healthcoin
          <div className={styles.bar}>
            <div className={styles.active + " " + styles.barItem}></div>
            <div className={styles.active + " " + styles.barItem}></div>
            <div className={styles.barItem}></div>
            <div className={styles.barItem}></div>
            <div className={styles.barItem}></div>
          </div>
        </div>
        <div className={styles.content + " clearfix"}>
          <Sidebar page="dashboard"></Sidebar>
          <div className={styles.dashboard}>
            <Card.Group stackable>
              <RewardsCard></RewardsCard>
              <PerformanceCard></PerformanceCard>
              <BadgesCard></BadgesCard>
            </Card.Group>
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
