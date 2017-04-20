import React, {Component} from "react"
import { Card, Modal, Button, Header, List, Image, Input, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router'
import Slider from 'react-slick'

import styles from './rewards-card.css'
import {sliderOptions} from '../../constants/slider-options'

export default class RewardsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOn: false,
      currentSlide: 0
    }
  }
  show() {
    this.setState({modalOn: true})
  }

  hide() {
    this.setState({modalOn: false})
  }

  sliding(index) {
    this.setState({ currentSlide: index });
  }

  render() {
    const {modalOn, currentSlide} = this.state || {}
    const actionButton = [
      (<div>
        <p className={styles.bottomLabel}>View Your Healthcoin Balance</p>
        <Link to="/coins">
          <Button size="mini" floated="right">View Coins</Button>
        </Link>
        </div>),
      (<Button size="mini" floated="right">Connect Now</Button>),
      (<Button size="mini" floated="right">Redeem</Button>)
    ][currentSlide]
    return (
      <Card>
        <Card.Content>
          <div className={styles.content}>
            <Slider {...sliderOptions} afterChange={this.sliding.bind(this)}>
              <div>
                <Card.Header className="bold text-center">
                  <Image src="../../../images/badge-plus-one.png" alt="Rewards" style={{ width: 64, marginBottom: '.7em' }}/>
                  <br/>
                  Congrats, from Regional Health System
                </Card.Header>
                <Card.Description>
                  <List bulleted style={{ display: 'inline-block', fontSize: '.9em', marginTop: '.5em' }}>
                    <List.Item>Regional Health System congratulates you on your latest A1C result.</List.Item>
                    <List.Item>Your doctor and community health team have been notified of your progress.</List.Item>
                  </List>
                </Card.Description>
              </div>
              {/*<div>
                <Card.Header className="bold">
                  Enter your waist measurement
                </Card.Header>
                <Card.Description>
                  <br/>
                  Hey {this.props.currentUser.firstname},
                  <br/><br/>
                  We noticed you haven’t entered a waist measurement in over 120 days. Click the button below to follow
                  the easy tutorial on how to measure your waist.
                </Card.Description>
              </div>
              <div>
                <Card.Header className="bold">
                  Fitbit Connect
                </Card.Header>
                <Card.Description className="text-center">
                  <br/><br/>
                  <Image src="../../../images/fitbit.png" alt="fitbit"/>
                  <em className={styles.fitbitDescription}>One click seamless integration </em>
                </Card.Description>
              </div>
              <div>
                <Card.Header className="bold">
                  Reward Available!
                </Card.Header>
                <Card.Meta>
                  <p className={styles.meta}>
                    Hey {this.props.currentUser.firstname}, we noticed you have 4 coins, you can use them for an insurance discount by clicking here
                  </p>
                </Card.Meta>
                <Card.Description className="text-center hand-cursor">
                  <Image src="../../../images/rewards.png" alt="Rewards"/>
                </Card.Description>
              </div>*/}
            </Slider>
          </div>
        </Card.Content>
        <Card.Content extra className={styles.cardExtraContent}>
          {actionButton}
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
            <Input
              label={<Dropdown defaultValue='inches' options={[{ key: 'inches', text: 'inches', value: 'inches' }]} />}
              labelPosition='right'
              className="float-left"
              placeholder={`37`}/>
            <Button color="violet" onClick={this.hide.bind(this)}>Submit</Button>
          </Modal.Actions>
        </Modal>
      </Card>
    )
  }
}
