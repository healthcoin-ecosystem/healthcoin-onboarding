import React, {Component} from "react"
import {connect} from 'react-redux'
import moment from 'moment'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from './sidebar'
import AdminMarkersGraph from './markers-graph'
import {Header, Segment, List, Icon} from 'semantic-ui-react'

import styles from './group-details.css'

class AdminGroupDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentParticipantIndex: -1
    }
  }

  componentWillMount() {
    if (!this.props.auth.token ||
        !(this.props.auth.currentUser.roles || []).find(role => role === 'admin')) {
      browserHistory.push('/admin/sign-in')
    }
  }

  toggleParticipants(index) {
    return () => {
      this.setState({
        currentParticipantIndex: index === this.state.currentParticipantIndex ? -1 : index
      })
    }
  }

  render() {
    const {currentUser} = this.props.auth
    const {currentParticipantIndex} = this.state
    const sampleParticipant = (index) => ({
      name: `’Participant’ ${index}`,
      markers: [{
        'title': 'A1C',
        'value': '5.6%',
        'createdDate': moment([2017, 2, 9])
      }, {
        'title': 'Triglycerides',
        'value': '27',
        'createdDate': moment([2017, 3, 15])
      }, {
        'title': 'HDL',
        'value': '19',
        'createdDate': moment([2017, 3, 28])
      }, {
        'title': 'Waist Size',
        'value': '30',
        'createdDate': moment([2017, 5, 15])
      }, {
        'title': 'Blood pressure',
        'value': '120/70',
        'createdDate': moment([2015, 7, 14])
      }]
    })
    const participants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => sampleParticipant(i))
    const $participantsList = participants.map((p, index) => {
      const $markers = (p.markers || []).map((marker, i) => (
        <List.Item key={i}>
          <List.Content className={styles.listContent}>
            <div className={styles.leftArea}></div>
            <div className={styles.middleArea + ' ' + styles.borderTop}>
              {marker.title}: {marker.value}
            </div>
            <div className={styles.rightArea + ' ' + styles.borderTop}>
              {marker.createdDate.format('DD/MM/YYYY')}
            </div>
          </List.Content>
        </List.Item>
      ))

      const $markerList = (
        <List
          verticalAlign="middle"
          className={styles.markerList}>
          {$markers}
        </List>
      )

      const arrowIcon = currentParticipantIndex === index ? "triangle down" : "triangle right"
      const firstOrLastEntry = index === 0 ?
        'firstEntry' : ( index === participants.length - 1 ? 'lastEntry' : '' )
      return (
        <List.Item key={index} className={styles[firstOrLastEntry]}>
          <List.Content className={styles.listContent}>
            <div className={styles.leftArea}
                 onClick={this.toggleParticipants(index).bind(this)}>
              <Icon
                className={styles.triangleIcon}
                name={arrowIcon}
                size="large"></Icon>
            </div>
            <div className={styles.middleArea}>
              {p.name}
            </div>
            <div className={styles.rightArea}>
              {p.markers.length} Shared Markers
            </div>
          </List.Content>
          {(p.markers || []).length > 0 && currentParticipantIndex === index && $markerList}
        </List.Item>
      )
    })

    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <div className={styles.content}>
          <Sidebar page="groups"></Sidebar>
          <div className={styles.groupDetails}>
            <Segment className={styles.section}>
              <Header as='h1' id={styles.title}>Group {this.props.params.id} Bio Data</Header>
              <div>
                <AdminMarkersGraph></AdminMarkersGraph>
              </div>
            </Segment>
            <Segment className={styles.section}>
              <Header as='h1' id={styles.title}>Group {this.props.params.id} Details</Header>
              <List divided relaxed size="big" verticalAlign="middle">
                {$participantsList}
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
)(AdminGroupDetails)
