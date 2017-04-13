import React, {Component} from "react"
import {connect} from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from '../partials/sidebar'
import ProgressBar from '../partials/progress-bar'
import {Header, Segment, List, Image, Button, Icon} from 'semantic-ui-react'

import styles from './index.css'

class BioHistory extends Component {

  componentWillMount() {
    if (!this.props.auth.token) {
      browserHistory.push('/sign-in')
    }
  }

  render() {
    const {currentUser} = this.props.auth
    const now = moment(new Date())
    const bioDataEntries = [{
      title: 'A1C',
      value: '',
      createdDate: moment([2017, 3, 10]).from(now),
      verified: false
    }, {
      title: 'Blood Pressure Reported',
      value: '120/70',
      createdDate: moment([2006, 2, 21]).from(now),
      verified: false
    }, {
      title: 'Added Weight: 196lbs',
      value: '- 12lb',
      createdDate: moment([2006, 1, 13]).from(now),
      verified: true
    }, {
      title: 'Added Weight: 196lbs',
      value: '- 12lb',
      createdDate: moment([2006, 3, 14]).from(now),
      verified: true
    }, {
      title: 'Added Weight: 196lbs',
      value: '- 12lb',
      createdDate: moment([2016, 11, 21]).from(now),
      verified: true
    }, {
      title: 'Added Weight: 208lbs',
      value: '- 12lb',
      createdDate: moment([2010, 8, 21]).from(now),
      verified: true
    }]

    const $bioHisotryList = bioDataEntries.map((bio, index) => {
      const firstOrLastEntry = index === 0 ?
        'firstEntry' : ( index === bioDataEntries.length - 1 ? 'lastEntry' : '' )
      return (
        <List.Item key={index}>
          <List.Content className={styles.entry + ' ' + styles[firstOrLastEntry]}>
            <div className={styles.title}>{bio.title}</div>
            <div className={styles.date}>{_.startCase(_.toLower(bio.createdDate))}</div>
            <Button
              className={styles.button}
              size="small"
              color={bio.verified ? 'grey' : 'violet'}
              basic={bio.verified}
              disabled={bio.verified}>
              {bio.verified ? 'Verified' : 'Pending'}
            </Button>
          </List.Content>
        </List.Item>
      )
    })

    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <ProgressBar></ProgressBar>
        <div className={styles.content + " clearfix"}>
          <Sidebar page="bio-history"></Sidebar>
          <div className={styles.history}>
            <Segment id={styles.history}>
              <Header as='h1' id={styles.title}>Bio-Data History</Header>
              <List divided relaxed size="big" verticalAlign="middle">
                {$bioHisotryList}
              </List>
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
)(BioHistory)
