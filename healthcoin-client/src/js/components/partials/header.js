import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Dropdown, Image} from 'semantic-ui-react'
import * as authActions from '../../actions/auth'
import * as markerActions from '../../actions/marker'
import {browserHistory} from 'react-router'

import styles from './header.css'

class DashboardHeader extends Component {

  signOut() {
    this.props.actions.signOut();
    this.props.actions.cleanupMarkers();
    browserHistory.push("/")
  }

  resetDemo() {
    this.props.actions.resetDemoBiodata();
  }

  render() {
    const currentUser = this.props.currentUser || {}
    return (
      <header className={styles.wrapper}>
        <div className="clearfix restrict-width">
          <Image className={styles.logo} src="../../../images/logo-small.png" alt="Healthcoin Logo"/>
          <h1 className={styles.siteName}>Healthcoin</h1>
          <div className={styles.profileArea}>
            <Dropdown
              pointing='top right'
              text={'Hi, ' + currentUser.firstname || ''}>
              <Dropdown.Menu>
                <Dropdown.Item text='Account Settings'/>
                <Dropdown.Item text='Reset Demo' onClick={this.resetDemo.bind(this)}/>
                <Dropdown.Item text='Logout' onClick={this.signOut.bind(this)}/>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...authActions, ...markerActions}, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHeader)
