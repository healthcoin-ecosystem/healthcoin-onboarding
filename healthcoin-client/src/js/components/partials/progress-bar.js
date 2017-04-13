import React, {Component} from "react"
import {Button, List} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './progress-bar.css'

export default class ProgressBar extends Component {
  render() {
    return (
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
    )
  }
}
