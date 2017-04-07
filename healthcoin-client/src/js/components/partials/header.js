import React, {Component} from "react"
import {Dropdown} from 'semantic-ui-react'

import styles from './header.css'

const logo = require('../../../images/logo-small.png')

export default class DashboardHeader extends Component {
  render() {
    const currentUser = this.props.currentUser || {}
    return (
      <header className={styles.wrapper}>
        <div className="clearfix">
          <img className={styles.logo} src={logo} title="Healthcoin Logo"></img>
          <h1 className={styles.siteName}>Healthcoin</h1>
          <div className={styles.profileArea}>
            <Dropdown text={'Hi, ' + currentUser.firstname || ''} options={[]}/>
          </div>
        </div>
      </header>
    )
  }
}
