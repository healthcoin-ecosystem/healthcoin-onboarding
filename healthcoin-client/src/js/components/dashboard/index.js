import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Header from '../partials/header'

class Dashboard extends Component {
  componentWillMount() {
    if (!this.props.auth.token) {
      browserHistory.push('/sign-in')
    }
  }
  render() {
    const {currentUser} = this.props.auth
    return (
      <div>
        <Header currentUser={currentUser}></Header>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
