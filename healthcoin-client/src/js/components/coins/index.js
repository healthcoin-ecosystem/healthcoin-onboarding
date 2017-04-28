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

class Coins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBioDataIndex: -1
    }
  }

  componentWillMount() {
    //if (!this.props.auth.token) {
    //  browserHistory.push('/sign-in')
    //}
  }

  toggleBioData(index) {
    return () => {
      this.setState({
        currentBioDataIndex: index === this.state.currentBioDataIndex ? -1 : index
      })
    }
  }

  render() {
    const {currentUser} = this.props.auth
    const {currentBioDataIndex} = this.state
    const now = moment(new Date())

    const coins = [{
      title: 'Coin 1',
      createdDate: moment([2015, 3, 2]).from(now),
      submitted: true,
      bioData: [{
        title: 'A1C',
        value: '5.6%',
        createdDate: moment([2015, 3, 2])
      }, {
        title: 'Triglycerides',
        value: '207',
        createdDate: moment([2015, 1, 5])
      }, {
        title: 'HDL',
        value: '190',
        createdDate: moment([2015, 2, 9])
      }, {
        title: 'Waist Size',
        value: '30',
        createdDate: moment([2015, 3, 1])
      },{
        title: 'Blood Pressure',
        value: '120/70',
        createdDate: moment([2015, 3, 1])
      }]
    }, {
      title: 'Coin 2',
      createdDate: moment([2017, 3, 1]).from(now),
      submitted: false,
      bioData: [{
        title: 'A1C',
        value: '5.6%',
        createdDate: moment([2016, 3, 2])
      }, {
        title: 'Triglycerides',
        value: '207',
        createdDate: moment([2016, 1, 5])
      }, {
        title: 'HDL',
        value: '190',
        createdDate: moment([2016, 2, 9])
      }, {
        title: 'Waist Size',
        value: '30',
        createdDate: moment([2016, 3, 1])
      },{
        title: 'Blood Pressure',
        value: '120/70',
        createdDate: moment([2017, 3, 1])
      }]
    }, {
      title: 'Coin 3',
      createdDate: moment([2017, 3, 2]).from(now),
      submitted: null,
      bioData: [{
        title: 'A1C',
        value: '5.6%',
        createdDate: moment([2017, 3, 2])
      }, {
        title: 'Triglycerides',
        value: '207',
        createdDate: moment([2017, 1, 5])
      }]
    }, {
      title: 'Coin 4',
      createdDate: moment([2017, 3, 1]).from(now),
      submitted: null,
      bioData: [{
        title: 'Waist Size',
        value: '30',
        createdDate: moment([2016, 3, 1])
      },{
        title: 'Blood Pressure',
        value: '120/70',
        createdDate: moment([2017, 3, 1])
      }]
    }, {
      title: 'Coin 5',
      createdDate: moment([2017, 3, 2]).from(now),
      submitted: null,
      bioData: [{
        title: 'A1C',
        value: '5.6%',
        createdDate: moment([2017, 3, 2])
      }, {
        title: 'Triglycerides',
        value: '207',
        createdDate: moment([2017, 1, 5])
      }, {
        title: 'Waist Size',
        value: '30',
        createdDate: moment([2016, 3, 1])
      }]
    }]
    const $coinsList = coins.map((coin, index) => {
      const $bioData = (coin.bioData || []).map((bio, i) => (
        <List.Item key={i}>
          <List.Content className={styles.coinContent}>
            <div className={styles.leftArea}></div>
            <div className={styles.middleArea + ' ' + styles.bioMiddleArea}>
              <div className={styles.coinTitle}>{bio.title}: {bio.value}</div>
              <div className={styles.coinDate}>
                {bio.createdDate.format('DD/MM/YYYY')}
              </div>
            </div>
            <div className={styles.rightArea + ' ' + styles.borderTop}></div>
          </List.Content>
        </List.Item>
      ))

      const $bioDataList = (
        <List
          verticalAlign="middle"
          className={styles.bioList}>
          {$bioData}
        </List>
      )

      const arrowIcon = currentBioDataIndex === index ? "triangle down" : "triangle right"
      const firstOrLastEntry = index === 0 ?
        'firstEntry' : ( index === coins.length - 1 ? 'lastEntry' : '' )
      return (
        <List.Item key={index} className={styles[firstOrLastEntry]}>
          <List.Content className={styles.coinContent}>
            <div className={styles.leftArea}
                 onClick={this.toggleBioData(index).bind(this)}>
              <Icon
                className={styles.triangleIcon}
                name={arrowIcon}
                size="large"></Icon>
              <Image src="../../../images/coins-icon.svg" className={styles.coinsIcon}/>
            </div>
            <div className={styles.middleArea}>
              <div className={styles.coinTitle}>{coin.title}</div>
              <div className={styles.coinDate}>{_.startCase(_.toLower(coin.createdDate))}</div>
            </div>
            <div className={styles.rightArea}>
              {
                coin.submitted === null
                ? null
                : <Button
                    fluid
                    className={styles.submitCoinButton}
                    size="small"
                    color={coin.submitted ? 'grey' : 'violet'}
                    basic={coin.submitted}
                    disabled={coin.submitted}>
                    {coin.submitted ? 'Submitted' : 'Submit'}
                  </Button>
              }
            </div>
          </List.Content>
          {(coin.bioData || []).length > 0 && currentBioDataIndex === index && $bioDataList}
        </List.Item>
      )
    })

    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <ProgressBar></ProgressBar>
        <div className={styles.content + " clearfix restrict-width"}>
          <Sidebar page="coins"></Sidebar>
          <div className={styles.coins}>
            <Segment id={styles.coins}>
              <Header as='h1' id={styles.title}>Coins</Header>
              <List divided relaxed size="big" verticalAlign="middle">
                {$coinsList}
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
)(Coins)
