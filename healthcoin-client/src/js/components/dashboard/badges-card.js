import React, {Component} from "react"
import {Card, Modal, Button, Header, List, Image} from 'semantic-ui-react'

import styles from './badges-card.css'

export default class BadgesCard extends Component {
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
              Next Badge: Bio-data Boss
            </Card.Header>
            <Card.Meta>
              <p className={styles.meta}>
                Add 2 more biomarkers to earn the Bio-data Boss Badge.
              </p>
            </Card.Meta>
            <Card.Description className="text-center hand-cursor">
              <Image onClick={this.show.bind(this)} src="../../../images/bio-data-boss.png" alt="Bio-data Boss"/>
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra>
          <p className={styles.bottomLabel}>6 more badges available</p>
          <Button onClick={this.show.bind(this)} size="mini" floated="right">View Badges</Button>
        </Card.Content>
        <Modal size="small" dimmer="inverted" open={modalOn} onClose={this.hide.bind(this)}>
          <Modal.Header className={styles.header}>
            Healthcoin Badges
            <p className={styles.metaHeader}>
              Below are the possible badges that you can earn on the Healthcoin system.
            </p>
          </Modal.Header>
          <Modal.Content>
            <div className={styles.badges}>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-great-start.png" alt="Great Start"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>Great Start</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-shooting-star.png" alt="Shooting Star"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>Shooting Star</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-bio-data-boss.png" alt="Bio-data Boss"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>Bio-data Boss</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-fit-for-good.png" alt="Fit For Good"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>FitForGood</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-step-master.png" alt="Step Master"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>Step Master</h4>
                  <p className={styles.badgeDescription}>Earned by 45 Coins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-do-gooder.png" alt="DoGooder"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>DoGooder</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-weight-loss.png" alt="Weight-loss"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>Weight-loss</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
              <div className={styles.badge}>
                <Image floated="left" src="../../../images/badge-helping-hero.png" alt="Helping Hero"/>
                <div className={styles.badgeContent}>
                  <h4 className={styles.badgeName}>Helping Hero</h4>
                  <p className={styles.badgeDescription}>Earned for signing up to Healthcoins</p>
                  <em className={styles.badgeCoinsCount}>2 Health Coins</em>
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button color="violet" onClick={this.hide.bind(this)}>Close</Button>
          </Modal.Actions>
        </Modal>
      </Card>
    )
  }
}
