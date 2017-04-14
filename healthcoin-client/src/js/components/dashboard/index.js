import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import ProgressBar from '../partials/progress-bar'
import Sidebar from '../partials/sidebar'
import RewardsCard from './rewards-card'
import PerformanceCard from './performance-card'
import BadgesCard from './badges-card'
import {Card, Segment, Dropdown, Radio} from 'semantic-ui-react'

import styles from './index.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: 'You'
    }
  }

  handleChange(e, {value}) {
    this.setState({
      group: value
    })
  }

  componentWillMount() {
    if (!this.props.auth.token) {
      browserHistory.push('/sign-in')
    }
  }

  componentDidMount() {
    const serial = {
      x: [3, 5, 7, 9, 13, 15, 19],
      y: [155, 21, 200, 350, 75, 152, 178],
      fill: 'tozeroy',
      name: "Blood pressure",
      type: 'area',
      hoverinfo: 'x+name+y+text',
      showlegend: true,
      marker: {
        color: '#6a15c6',
        size: 10,
        symbol: '100',
        opacity: '1'
      },
      line: {
        shape: 'spline'
      }
    };

    const trace2 = {
      x: [7, 13],
      y: [200, 75],
      name: "Badge Earned",
      type: 'scatter',
      hoverinfo: 'none',
      showlegend: true,
      marker: {
        color: '#6a15c6',
        size: 16,
        symbol: 'circle-open-dot',
        opacity: '1'
      },
      line: {
        width: '0'
      }
    };

    var data = [trace2, serial];

    Plotly.newPlot('graph', data, {
      margin: {
        l: 20,
        r: 20,
        t: 20,
        b: 20
      },
      xaxis: {
        tickmode: 'linear'
      },
      legend: {
        bgcolor: 'transparent',
        orientation: 'h',
        x: '0.7',
        y: '1'
      }
    }, {
      displayModeBar: false
    });
  }

  render() {
    const {currentUser} = this.props.auth
    const {group} = this.state
    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <ProgressBar></ProgressBar>
        <div className={styles.content + " clearfix restrict-width"}>
          <Sidebar page="dashboard"></Sidebar>
          <div className={styles.dashboard}>
            <Card.Group stackable className={styles.cards}>
              <RewardsCard></RewardsCard>
              <PerformanceCard></PerformanceCard>
              <BadgesCard></BadgesCard>
            </Card.Group>
            <Segment id={styles.graphArea}>
              <Dropdown text='A1C' icon='chevron down' floating labeled button className='icon'>
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
                  checked={group === 'You'}
                  value='You'
                  onChange={this.handleChange.bind(this)}
                />&nbsp;&nbsp;&nbsp;
                <Radio
                  label='Cohort'
                  name='radioGroup'
                  checked={group === 'Cohort'}
                  value='Cohort'
                  onChange={this.handleChange.bind(this)}
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
