import React, {Component} from "react"
import {Card, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './performance-card.css'

export default class PerformanceCard extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <div className={styles.content}>
            <Card.Header className="bold">
              How You're Performing
            </Card.Header>
            <Card.Description className="text-center">
              <svg className={styles.youVsCohort}>
                <text x="83" y="115">2</text>
                <text x="163" y="35">48</text>
                <text x="6" y="75">AVG</text>
                <text x="220" y="75">42</text>
                <rect x="55" y="120" fill="#614baf" width="64" height="20"/>
                <rect x="139" y="40" fill="#a98fe1" width="64" height="100"/>
                <line x1="45" y1="140" x2="210" y2="140" strokeWidth="2" stroke="#333"/>
                <line x1="48" y1="70" x2="210" y2="70" strokeWidth="1" stroke="#333" strokeDasharray="5,6"/>
                <text x="73" y="160">You</text>
                <text x="150" y="160">Cohort</text>
              </svg>
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra className={styles.cardExtraContent}>
          <p className={styles.bottomLabel}>Performance vs Cohort</p>
          <Link to="/coins">
            <Button size="mini" floated="right">View Coins</Button>
          </Link>
        </Card.Content>
      </Card>
    )
  }
}
