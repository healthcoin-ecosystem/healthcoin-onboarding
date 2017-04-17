import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Card, Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router'
import Slider from 'react-slick'

import styles from './performance-card.css'
import {sliderOptions} from '../../constants/slider-options'

class PerformanceCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderIndex: 0,
      sliderOptions: Object.assign({}, sliderOptions, {dots: false, arrows: false}),
      pfizerShared: false
    }
  }

  slide(index) {
    this.setState({ 
      sliderIndex: index 
    });
  }

  pfizerUpdate() {
    this.setState({ 
      pfizerShared: !this.state.pfizerShared
    });
  }

  componentWillReceiveProps(props) {
    if(props.marker.marker) {
      this.setState({ 
        sliderOptions: Object.assign({}, this.state.sliderOptions, {dots: true, arrows: true}),
        pfizerShared: false
      });
      this.refs.slider.slickGoTo(1)
    }
  }  

  render() {
    const {sliderIndex, pfizerShared} = this.state;
    const pfizerLabel = pfizerShared ? 'If you change your mind' : 'To opt-in please share your data';
    const pfizerButton = pfizerShared ? 'Opt-out' : 'Share';
    const footer = [
      (<div>
        <p className={styles.bottomLabel}>Performance vs Cohort</p>
        <Link to="/coins">
          <Button size="mini" floated="right">View Coins</Button>
        </Link>
        </div>),
      (<div>
        <p className={styles.bottomLabel}>{pfizerLabel}</p>
        <Button size="mini" floated="right" onClick={this.pfizerUpdate.bind(this)}>{pfizerButton}</Button>
       </div>),
    ][sliderIndex];

    return (
      <Card>
        <Card.Content>
          <div className={styles.content}>
            <Slider ref='slider' {...this.state.sliderOptions} afterChange={this.slide.bind(this)}>
              <div>
                <Card.Header className="bold">
                  How You're Performing
                </Card.Header>
                <Card.Description className="text-center">
                  <svg className={styles.youVsCohort}>
                    <text x="83" y="115">4</text>
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
              <div>
                <Card.Header className="bold">
                  Pfizer Study Available
                </Card.Header>
                <Card.Description className="text-center">
                  <br/><br/>
                  <Image src="../../../images/pfizer.svg" alt="pfizer"/>
                </Card.Description>
              </div>              
            </Slider>  
          </div>
        </Card.Content>
        <Card.Content extra className={styles.cardExtraContent}>
          {footer}
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    marker: state.marker
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceCard)
