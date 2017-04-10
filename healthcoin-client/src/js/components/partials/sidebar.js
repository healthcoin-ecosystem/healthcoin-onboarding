import React, {Component} from "react"
import {Button, List} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './sidebar.css'

export default class Header extends Component {
  addBioData() {

  }

  render() {
    const page = this.props.page || {}
    return (
      <aside className={styles.wrapper}>
        <List className={styles.menus}>
          <List.Item>
            <Link className={styles.dashboardMenu + ' ' + (page === 'dashboard' ? styles.active : '')} to="/dashboard">
              Dashboard
            </Link>
          </List.Item>
          <List.Item>
            <Link className={styles.coinsMenu + ' ' + (page === 'coins' ? styles.active : '')} to="/coins">
              Coins
            </Link>
          </List.Item>
          <List.Item>
            <Link className={styles.historyMenu + ' ' + (page === 'history' ? styles.active : '')} to="/history">
              Bio-Data History
            </Link>
          </List.Item>
        </List>
        <Link>
          <Button color="violet" fluid onClick={this.addBioData.bind(this)}>Add Bio-data</Button>
        </Link>
      </aside>
    )
  }
}
