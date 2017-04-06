import React, {Component, PropTypes} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Header from '../components/partials/header'
import Footer from '../components/partials/footer'

class Layout extends Component {
  render() {
    return (
      <div className="healthcoin-body">
        <article className="healthcoin-article">
          <div>{this.props.children}</div>
        </article>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    globalState: state.global
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
)(Layout)
