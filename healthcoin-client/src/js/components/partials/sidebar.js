import React, {Component} from "react"
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './sidebar.css'

export default class Header extends Component {
  render() {
    const page = this.props.page || {}
    return (
      <aside className={styles.wrapper}>
        <ul className={styles.menus}>
          <li>
            <Link className={styles.dashboardMenu + ' ' + (page === 'dashboard' ? styles.active : '')} to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className={styles.coinsMenu + ' ' + (page === 'coins' ? styles.active : '')} to="/coins">
              Coins
            </Link>
          </li>
          <li>
            <Link className={styles.historyMenu + ' ' + (page === 'history' ? styles.active : '')} to="/history">
              Bio-Data History
            </Link>
          </li>
        </ul>
        <Button color="violet" fluid>Add Bio-data</Button>
      </aside>
    )
  }
}
