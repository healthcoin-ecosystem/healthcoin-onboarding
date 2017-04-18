import React, {Component} from "react"

import styles from './footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className={styles.wrapper}>
        Healthcoin @ 2017
      </footer>
    )
  }
}
