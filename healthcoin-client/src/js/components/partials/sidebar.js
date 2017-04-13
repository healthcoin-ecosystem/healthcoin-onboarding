import React, {Component} from "react"
import {Button, List, Modal, Input, Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './sidebar.css'

export default class Header extends Component {
  addBioData() {
    this.setState({modalOn: true})
  }

  hide() {
    this.setState({modalOn: false})
  }

  render() {
    const page = this.props.page || {}
    const {modalOn} = this.state || {}
    const bioInputs = [
      {key: 'A1C', text: 'A1C', value: 'A1C'},
      {key: 'Trigylcerides', text: 'Trigylcerides', value: 'Trigylcerides'},
      {key: 'HDL', text: 'HDL', value: 'HDL'},
      {key: 'Waist Size', text: 'Waist Size', value: 'Waist Size'},
      {key: 'Blood Pressure', text: 'Blood Pressure', value: 'Blood Pressure'}
    ]
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
            <Link className={styles.historyMenu + ' ' + (page === 'bio-history' ? styles.active : '')}
                  to="/bio-history">
              Bio-Data History
            </Link>
          </List.Item>
        </List>
        <Link>
          <Button color="violet" fluid onClick={this.addBioData.bind(this)}>Add Bio-data</Button>
        </Link>
        <Modal
          size="small"
          dimmer="inverted"
          open={modalOn}
          onClose={this.hide.bind(this)}>
          <Modal.Header className={styles.header}>
            Add a Bio-Data
            <p className={styles.metaHeader}>
              Enter the data below and upload your verification
            </p>
          </Modal.Header>
          <Modal.Content>
            <Input
              label={<Dropdown defaultValue='A1C' options={bioInputs} />}
              labelPosition='right'
              placeholder={`8`}/>
            <p className={styles.note}>
              <strong>Note:</strong> Entering an Hb1AC bio-data accounts for 50% of your overall health score
            </p>
          </Modal.Content>
          <Modal.Actions className="clearfix">
            <Button className="float-left" onClick={this.hide.bind(this)}>Cancel</Button>
            <Button color="violet" className="float-right" onClick={this.hide.bind(this)}>Submit</Button>
          </Modal.Actions>
        </Modal>
      </aside>
    )
  }
}
