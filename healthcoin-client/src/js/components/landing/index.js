import React, { Component, PropTypes } from "react"
import { browserHistory, Link } from 'react-router'
import { Grid, Button, Form, Divider } from 'semantic-ui-react'

import styles from './index.css'
const logo = require('../../../images/logo.png')

export default class Landing extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = '#fff';
  }

  componentWillUnount() {
    document.body.style.backgroundColor = '';
  }

  render() {
    return (
      <section className={styles.wrapper}>
        <div className="ui borderless main menu" style={{ boxShadow: 'none', border: 'none' }}>
          <div className="header item">
            <img className="logo" src={logo} alt="" style={{ width: 50 }}></img>
            <span style={{ fontSize: '2em', marginLeft: '.5em' }}>Healthcoin</span>
          </div>
        </div>
        <Grid columns="2" relaxed="very" stackable textAlign="center" verticalAlign="middle" padded style={{ paddingTop: '3em', paddingBottom: '3em' }}>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 480, textAlign: 'left' }}>
              <h1 style={{ fontWeight: 500, fontSize: '3em' }}>
                Your data is an asset.<br/>
                Build it. Earn from it.
              </h1>
              <h2 style={{ fontWeight: 500 }}>
                Build it up and earn from improved
                health. Healthcoin is the blockchain-
                powered platform to store, share, and
                earn from your healthcare data.
              </h2>
            </Grid.Column>
            <Grid.Column style={{ maxWidth: 480 }}>
              <img src="/images/main-bg.svg" className="img-responsive" style={{ width: 400, height: 400 }}/>
              <img src="/images/main-bg-overlay.svg" className="centering" style={{ width: 260, height: 260, position: 'absolute', top: '50%', left: '50%', marginLeft: '-25%', marginTop: '-25%' }}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div style={{ textAlign: 'center' }}>
          <Button as="a" href="/sign-in" size="large" style={{ width: '10em', color: '#fff', backgroundColor: '#ec7494' }}>Let's Begin</Button>
        </div>
      </section>
    );
  }
}
