import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from '../partials/sidebar'
import RewardsCard from './rewards-card'
import PerformanceCard from './performance-card'
import BadgesCard from './badges-card'
import {Button, Card, Image, Modal, Header, List, Segment, Dropdown, Radio} from 'semantic-ui-react'

import styles from './index.css'

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.auth.token) {
      browserHistory.push('/sign-in')
    }
  }

  componentDidMount() {
    var serial = {
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      y: [0, 4, 2, 8, 3, 2, 1, 6, 3, 5],
      fill: 'tozeroy',
      name: "FIRST",
      type: 'area',
      hoverinfo: 'x+name+y+text',
      showlegend: true,
      marker: {
        color: '#6a15c6',
        size: 12,
        symbol: '100',
        opacity: '1'
      },
      line: {
        shape: 'spline'
      }
    };
    var data = [serial];

    Plotly.newPlot('graph', data);
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
            <Card.Group stackable className={styles.cards}>
              <RewardsCard></RewardsCard>
              <PerformanceCard></PerformanceCard>
              <BadgesCard></BadgesCard>
            </Card.Group>
            <Segment id={styles.graphArea}>
              <Dropdown text='ALC' icon='chevron down' floating labeled button className='icon'>
                <Dropdown.Menu>
                  <Dropdown.Item>My Weight</Dropdown.Item>
                  <Dropdown.Item>My Waist Size</Dropdown.Item>
                  <Dropdown.Item>My HDL</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="float-right">
                View: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio
                  label='You'
                  name='radioGroup'
                  value='you'
                />&nbsp;&nbsp;&nbsp;
                <Radio
                  label='Yohort'
                  name='radioGroup'
                  value='yohort'
                />
              </div>
              <div id="graph">
              </div>
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
