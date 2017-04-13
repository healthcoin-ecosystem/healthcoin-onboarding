import React, {Component} from "react"
import {Button, List, Modal, Input, Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './sidebar.css'

export default class Header extends Component {
  addGroup() {
  }

  render() {
    const page = this.props.page || {}
    return (
      <aside className={styles.wrapper}>
        <List className={styles.menus}>
          <List.Item>
            <Link className={styles.rewardsMenu + ' ' + (page === 'rewards' ? styles.active : '')} to="/admin">
              Rewards
            </Link>
          </List.Item>
          <List.Item>
            <Link className={styles.groupsMenu + ' ' + (page === 'groups' ? styles.active : '')} to="/admin/groups">
              Groups
            </Link>
          </List.Item>
        </List>
        <Link>
          <Button color="violet" fluid onClick={this.addGroup.bind(this)}>Add a Group</Button>
        </Link>
      </aside>
    )
  }
}
