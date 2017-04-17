import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as markerActions from '../../actions/marker'
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
    const {markers} = this.props.marker
    if (!markers) {
      this.props.actions.getUserMarkerTypes()
    }
  }

  render() {
    const {currentUser} = this.props.auth
    const now = moment(new Date())
    const bioDataEntries = this.props.marker.history || []

    const $bioHisotryList = bioDataEntries.map((bio, index) => {
      const firstOrLastEntry = index === 0 ?
        'firstEntry' : ( index === bioDataEntries.length - 1 ? 'lastEntry' : '' )
      return (
        <List.Item key={index}>
          <List.Content className={styles.entry + ' ' + styles[firstOrLastEntry]}>
            <div className={styles.title}>Added {bio.type} : {bio.value}</div>
            <div className={styles.date}>{_.startCase(_.toLower(moment(bio.date).from(now)))}</div>
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
        <div className={styles.content + " clearfix restrict-width"}>
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
    auth: state.auth,
    marker: state.marker
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(markerActions, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BioHistory)
