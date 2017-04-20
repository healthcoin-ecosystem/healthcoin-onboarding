import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as markerActions from '../../actions/marker'
import {Button, List, Modal, Input, Dropdown, Image, Grid} from 'semantic-ui-react'
import {Link} from 'react-router'
import {browserHistory} from 'react-router';

import styles from './sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.typeLabels = {
      "a1c": {
        text: "A1C bio-data",
        value: "50%"
      },
      "trigylcerides": {
        text: "your triglyceride level",
        value: "5%"
      },
      "hdl": {
        text: "your HDL level",
        value: "20%"
      },
      "waist size": {
        text: "an waist measurement",
        value: "10%"
      },
      "blood pressure": {
        text: "your blood pressure level",
        value: "15%"
      }
    };

    this.state = {
      marker: {
        value: ''
      }, errors: {}
    };
  }

  updateField = (fieldName) => {
    return (event) => {
      let marker = this.state.marker
      marker[fieldName] = event.target.value
      this.setState({marker})
    }
  }

  componentWillMount() {
    const {markers} = this.props.marker
    if (!markers) {
      this.props.actions.getUserMarkerTypes()
    }
  }

  componentWillUpdate() {
    const markers = this.props.marker.markers || []
    if (markers.length > 0 && !this.state.typeId) {
      this.updateType(null, {
        value: markers[0]._id
      })
    }
  }

  openBioDataModal() {
    this.setState({modal: "data"});
  }

  submitBioData() {
    const {marker, typeId} = this.state;
    this.props.actions.addMarker(typeId, {
      date: new Date(),
      value: marker.value
    });
    this.setState({modal: "success"});
  }

  closeModal() {
    this.setState({
      modal: null,
      typeId: null
    });
  }

  updateType(e, data) {
    const markers = this.props.marker.markers || []
    const selectedType = markers.find(m => m._id === data.value)

    let typeLabel = {};
    if(selectedType) {
      typeLabel = this.typeLabels[selectedType.type.toLowerCase()];
    }

    this.setState({
      typeId: data.value,
      typeLabel
    });
  }

  render() {
    const page = this.props.page || {}
    const {modal} = this.state
    const markers = this.props.marker.markers || []
    const bioTypes = markers.map(m => ({
      key: m.type,
      text: m.type,
      value: m._id
    }))
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
            <Link className={styles.historyMenu + ' ' + (page === 'bio-history' ? styles.active : '')} to="/bio-history">
              Bio-Data History
            </Link>
          </List.Item>
        </List>
        <Link>
          <Button color="violet" fluid onClick={this.openBioDataModal.bind(this)}>Add Bio-Data</Button>
        </Link>
        <Modal
          size="small"
          dimmer="inverted"
          open={modal === 'data'}
          onClose={this.closeModal.bind(this)}>
          <Modal.Header id={styles.header}>
            <h2 className="no-margin">Add Bio-Data</h2>
            <p className={styles.subHeader}>
              Enter the data below and upload your verification
            </p>
          </Modal.Header>
          <Modal.Content id={styles.content}>
            <div className={styles.content}>
              <Input
                id={styles.input}
                label={<Dropdown defaultValue={bioTypes[0] && bioTypes[0].value} options={bioTypes} onChange={this.updateType.bind(this)} />}
                labelPosition='right'
                onChange={this.updateField('value')}
                placeholder=""
                autoFocus/>
              <p className={styles.note}>
                <strong>Note: </strong>
                {this.state.typeLabel && this.state.typeLabel.text} accounts for {this.state.typeLabel && this.state.typeLabel.value} of your overall health score
              </p>
              <div className={styles.upload}>
                <Image src="../../../images/upload.png" id={styles.uploadImg}></Image>
                <p className={styles.line}>Drag & Drop your verification here: </p>
                <p className={styles.line}>we accept PNG, JPEG, and PDF</p>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="clearfix" id={styles.actions}>
            <Button className="float-left no-margin" onClick={this.closeModal.bind(this)}>Cancel</Button>
            <Button className="float-right no-margin" color="violet"
                    onClick={this.submitBioData.bind(this)}>Submit</Button>
          </Modal.Actions>
        </Modal>
        <Modal
          size="small"
          dimmer="inverted"
          open={modal === 'success'}
          onClose={this.closeModal.bind(this)}>
          <Modal.Header id={styles.header}>
            <h2 className="no-margin">Healthcoins Earned</h2>
            <p className={styles.subHeader}>
              You are generating Healthcoins like a champ. Here's how you did it.
            </p>
          </Modal.Header>
          <Modal.Content id={styles.earnedContent}>
            <Grid columns="2" relaxed="very" stackable textAlign="center" verticalAlign="middle" padded>
              <Grid.Row>
                <Grid.Column style={{ maxWidth: 330 }}>
                  <div style={{ color: '#5b5' }}><span style={{ fontSize: '1em', verticalAlign: 'middle' }}>&#9660;</span> <span style={{ fontSize: '4em', verticalAlign: 'middle' }}>2</span></div>
                  <h3>Improved A1C Level</h3>
                  <List bulleted style={{ textAlign: 'left' }}>
                    <List.Item>You lowered your A1C by 2 points.</List.Item>
                    <List.Item>You entered results twice in 6 months.</List.Item>
                    <List.Item>Click below to see your A1C history.</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column style={{ maxWidth: 330 }}>
                  <div style={{ color: '#5b5' }}><span style={{ fontSize: '2em', verticalAlign: 'middle', fontWeight: 'bold' }}>+</span> <span style={{ fontSize: '4em', verticalAlign: 'middle' }}>5</span></div>
                  <h3>Healthcoins Earned</h3>
                  <List bulleted style={{ textAlign: 'left' }}>
                    <List.Item>You have earned 7 coins in 7 days.</List.Item>
                    <List.Item>Enter more bio-data to earn more.</List.Item>
                    <List.Item>Go to your Dashboard for more ways to earn Healthcoins.</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column style={{ maxWidth: 330 }}>
                  <Button onClick={this.closeModal.bind(this)} color="violet" size="large" style={{ width: '90%' }}>View A1C History</Button>
                </Grid.Column>
                <Grid.Column style={{ maxWidth: 330 }}>
                  <Button onClick={this.closeModal.bind(this)} color="violet" size="large" style={{ width: '90%' }}>Go to Dashboard</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Modal.Content>
        </Modal>
      </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    marker: state.marker
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(markerActions, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
