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
      pfizerShared: false,
      you: 4,
      cohort: 48
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
        you: 34
        //sliderOptions: Object.assign({}, this.state.sliderOptions, {dots: true, arrows: true}),
        //pfizerShared: false
      });
      //this.refs.slider.slickGoTo(1)
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
      /*(<div>
        <p className={styles.bottomLabel}>{pfizerLabel}</p>
        <Button size="mini" floated="right" onClick={this.pfizerUpdate.bind(this)}>{pfizerButton}</Button>
       </div>),*/
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
                    <rect x="55" y={140 - (this.state.you * 2)} fill="#614baf" width="64" height={this.state.you * 2}/>
                    <rect x="139" y={140 - (this.state.cohort * 2)} fill="#a98fe1" width="64" height={this.state.cohort * 2}/>
                    <line x1="45" y1="140" x2="210" y2="140" strokeWidth="2" stroke="#333"/>
                    <text x="80" y={130 - (this.state.you * 2)} strokeWidth="5" stroke="#fff">{this.state.you}</text>
                    <text x="163" y={130 - (this.state.cohort * 2)} strokeWidth="5" stroke="#fff">{this.state.cohort}</text>
                    <text x="80" y={130 - (this.state.you * 2)}>{this.state.you}</text>
                    <text x="163" y={130 - (this.state.cohort * 2)}>{this.state.cohort}</text>
                    <text x="73" y="160">You</text>
                    <text x="150" y="160">Cohort</text>
                  </svg>
                </Card.Description>
              </div>
              {/*<div>
                <Card.Header className="bold">
                  Pfizer Study Available
                </Card.Header>
                <Card.Description className="text-center">
                  <br/><br/>
                  <Image src="../../../images/pfizer.svg" alt="pfizer"/>
                </Card.Description>
              </div>*/}
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
