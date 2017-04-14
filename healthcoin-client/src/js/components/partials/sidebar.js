import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as markerActions from '../../actions/marker'
import {Button, List, Modal, Input, Dropdown, Image} from 'semantic-ui-react'
import {Link} from 'react-router'

import styles from './sidebar.css'

class Sidebar extends Component {
  constructor(props) {
    super(props);
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
      this.setState({typeId: markers[0]._id})
    }
  }

  addBioData() {
    this.setState({modalOn: true})
  }

  submitBioData() {
    const {marker, typeId} = this.state
    this.props.actions.addMarker(typeId, {
      date: new Date(),
      value: marker.value
    })
  }

  hide() {
    this.setState({modalOn: false})
  }

  updateType(e, data) {
    this.setState({
      typeId: data.value
    })
  }

  render() {
    const page = this.props.page || {}
    const {modalOn} = this.state || {}
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
          <Modal.Header id={styles.header}>
            <h2 className="no-margin">Add a Bio-Data</h2>
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
                placeholder={`8`}/>
              <p className={styles.note}>
                <strong>Note: </strong>
                Entering an Hb1AC bio-data accounts for 50% of your overall health score
              </p>
              <div className={styles.upload}>
                <Image src="../../../images/upload.png" id={styles.uploadImg}></Image>
                <p className={styles.line}>Drag & Drop your verification here: </p>
                <p className={styles.line}>we accept png, jpgs, and pdf’s</p>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="clearfix" id={styles.actions}>
            <Button className="float-left no-margin" onClick={this.hide.bind(this)}>Cancel</Button>
            <Button className="float-right no-margin" color="violet"
                    onClick={this.submitBioData.bind(this)}>Submit</Button>
          </Modal.Actions>
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
