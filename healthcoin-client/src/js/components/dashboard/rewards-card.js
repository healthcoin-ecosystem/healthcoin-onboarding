import React, {Component} from "react"
import {Card, Modal, Button, Header, List, Image} from 'semantic-ui-react'

import styles from './rewards-card.css'

export default class RewardsCard extends Component {
  show() {
    this.setState({modalOn: true})
  }

  hide() {
    this.setState({modalOn: false})
  }

  render() {
    const {modalOn} = this.state || {}
    return (
      <Card>
        <Card.Content>
          <div className={styles.content}>
            <Card.Header>
              Reward Available!
            </Card.Header>
            <Card.Meta>
              <p className={styles.meta}>
                Hey Nick, we noticed you have 25 coins, you can use them for an insurance discount by clicking here
              </p>
            </Card.Meta>
            <Card.Description className="text-center hand-cursor">
              <Image onClick={this.show.bind(this)} src="../../../images/rewards.png" alt="Rewards"/>
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra>
          <Button size="mini" floated="right">Redeem</Button>
        </Card.Content>
        <Modal size="small" dimmer="inverted" open={modalOn} onClose={this.hide.bind(this)}>
          <Modal.Header className={styles.header}>
            How to measure your waist
            <p className={styles.metaHeader}>Follow this easy guide to make an accurate waist measurement</p>
          </Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='../../../images/measure-waist.png'/>
            <Modal.Description>
              <Header>How to measure waist</Header>
              <List bulleted>
                <List.Item>Remove or raise clothing. Remove your shirt or raise to just below your chest.</List.Item>
                <List.Item>Find your waist. Use your fingers to find the top of your hips and the base of your rib
                  cage.</List.Item>
                <List.Item>Take your measurement. Stand up straight and exhale slowly.</List.Item>
                <List.Item>Read the tape.</List.Item>
                <List.Item>Double-check your measurement.</List.Item>
              </List>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="violet" onClick={this.hide.bind(this)}>Submit</Button>
          </Modal.Actions>
        </Modal>
      </Card>
    )
  }
}
