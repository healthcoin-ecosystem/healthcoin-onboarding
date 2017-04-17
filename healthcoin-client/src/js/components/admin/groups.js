import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from './sidebar'
import {Link} from 'react-router'
import {Button, Card, Image, Modal, Header, List, Segment, Dropdown, Radio} from 'semantic-ui-react'

import styles from './groups.css'

class AdminDashboard extends Component {

  componentWillMount() {
    if (!this.props.auth.token ||
        !(this.props.auth.currentUser.roles || []).find(role => role === 'admin')) {
      browserHistory.push('/admin/sign-in')
    }
  }

  render() {
    const {currentUser} = this.props.auth
    const groups = [{
      id: '1',
      name: 'Group 1',
      membersCount: 20
    }, {
      id: '2',
      name: 'Group 2',
      membersCount: 20
    }, {
      id: '3',
      name: 'Group 3',
      membersCount: 20
    }, {
      id: '4',
      name: 'Group 4',
      membersCount: 20
    }, {
      id: '5',
      name: 'Group 5',
      membersCount: 20
    }, {
      id: '6',
      name: 'Group 6',
      membersCount: 20
    }]

    const $groupList = groups.map((group, index) => {
      const firstOrLastEntry = index === 0 ?
        'firstEntry' : ( index === groups.length - 1 ? 'lastEntry' : '' )
      return (
        <List.Item key={index}>
          <List.Content className={styles.entry + ' ' + styles[firstOrLastEntry]}>
            <div className={styles.name}>
              <Link to={`/admin/group/${group.id}`}>{group.name}</Link>
            </div>
            <div className={styles.count}>{group.membersCount} Members</div>
            <Link to={`/admin/group/${group.id}`}>
              <Button
                className={styles.button}
                size="small"
                color='violet'>
                View Participants
              </Button>
            </Link>
          </List.Content>
        </List.Item>
      )
    })
    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <div className={styles.content + " clearfix"}>
          <Sidebar page="groups"></Sidebar>
          <div className={styles.dashboard}>
            <Segment id={styles.groupList}>
              <Header as='h1' id={styles.title}>Groups</Header>
              <List divided relaxed size="big" verticalAlign="middle">
                {$groupList}
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
)(AdminDashboard)
