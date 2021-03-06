import React, {Component} from "react"
import { Card, Modal, Button, Image, List } from 'semantic-ui-react'
import Slider from 'react-slick'

import {sliderOptions} from '../../constants/slider-options'
import styles from './clinical-trial-card.css'

export default class ClinicalTrialCard extends Component {
  state = {
    sliderIndex: 0
  }

  show() {
    this.setState({modalOn: true})
  }

  hide() {
    this.setState({modalOn: false})
  }

  slide(index) {
    this.setState({
      sliderIndex: index
    });
  }

  render() {
    const {modalOn} = this.state || {}
    return (
      <Card>
        <Card.Content>
          <div className={styles.content}>
            <Slider {...sliderOptions} dots={false} afterChange={this.slide.bind(this)}>
              <div>
                <Card.Header className="bold">
                  Your Health is in Your Hands
                </Card.Header>
                <Card.Meta>
                  <p className={styles.meta}>
                    Based on your A1C level from your last result,
                    you qualify for a clinical trial of a glucose-lowering
                    oral medication.
                  </p>
                  <Image className={styles.img} onClick={this.show.bind(this)} src="../../../images/badge-trial.png" alt="Bio-data Boss"/>
                </Card.Meta>
                <Card.Description className={styles.description}>
                  <b>Your Data is Always Under Your Control</b>
                  <p>You are receiving this because you requested to receive "Clinical Trial Invitations". Adjust your <a href="#">settings here</a></p>
                </Card.Description>
              </div>
              <div>
                <Card.Header className="bold">
                  You've Earned Healthcoins
                </Card.Header>
                <Card.Meta>
                  <div style={{ width: 80, height: 80, backgroundColor: '#175', color: '#efe', textAlign: 'center', lineHeight: 1, fontWeight: 600, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 16, marginBottom: 16 }}>
                    <div style={{ fontSize: 20, marginRight: 0, paddingTop: 12, color: '#9fa' }}>Green</div>
                    <div style={{ fontSize: 20, marginRight: 0 }}>Basket</div>
                    <div style={{ textTransform: 'uppercase', letterSpacing: 1, fontSize: 9, fontWeight: 400, marginTop: 5 }}>Market</div>
                  </div>
                  <p>
                    We want to help you earn more with a 10%-off
                    coupon for healthy items.
                  </p>
                </Card.Meta>
              </div>
            </Slider>
          </div>
        </Card.Content>
        <Card.Content extra className={styles.cardExtraContent}>
          {this.state.sliderIndex == 1 ? (
            <div>
              <p className={styles.bottomLabel}>Marketplace Incentives</p>
              <Button size="mini" floated="right">Learn More</Button>
            </div>
          ) : (
            <div>
              <p className={styles.bottomLabel}>Clinical Trial Invitation</p>
              <Button onClick={this.show.bind(this)} size="mini" floated="right">Learn More</Button>
            </div>
          )}
        </Card.Content>
        <Modal size="small" dimmer="inverted" open={modalOn} onClose={this.hide.bind(this)}>
          <Modal.Header className={styles.header}>
            Clinical Trial Next Steps
            <p className={styles.metaHeader}>
              Learn more about this clinical trial and learn more about informed consent.
            </p>
          </Modal.Header>
          <Modal.Content style={{ padding: '2em 5em' }}>
            <h4>About the Clinical Trial</h4>
            <img src="../../../images/badge-trial.png" style={{ width: 64, float: 'right', marginLeft: '1em' }}/>
            <p>
              A Randomized, Double-blind, Parallel-group, Placebo-controlled
              Phase 2 Trial of GLM113A, an Oral Glucose-Lowering medication,
              for Patients With A1C levels 9 or higher.
            </p>
            <p>
              The study will be conducted as a placebo-controlled, randomized
              22 week double-blind study which will include a dose titration
              period. An additional transition... <a href="#">view more</a>
            </p>
            <br/>
            <h4>Your Data and Your Rights</h4>
            <img src="../../../images/badge-secure.png" style={{ width: 64, float: 'right', marginLeft: '1em' }}/>
            <List bulleted style={{ display: 'inline-block' }}>
              <List.Item>Any data collected by the trial will also belong to you.</List.Item>
              <List.Item>All of your data will be stored in your healthcoin account.</List.Item>
              <List.Item>You can always choose to opt into or out of clinical trials.</List.Item>
            </List>
          </Modal.Content>
          <Modal.Actions>
            <h3 className={styles.footerText}>
              To participate, first find out more about informed consent.
            </h3>
            <div>
              <Button color="violet" onClick={this.hide.bind(this)}>Review Informed Consent</Button>
            </div>
            <div>
              <Button basic style={{ boxShadow: 'none' }} onClick={this.hide.bind(this)}>Cancel</Button>
            </div>
          </Modal.Actions>
        </Modal>
      </Card>
    )
  }
}
