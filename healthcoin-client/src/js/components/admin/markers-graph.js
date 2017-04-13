import React, {Component} from "react"
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import Sidebar from './sidebar'
import {Link} from 'react-router'
import {Button, Card, Image, Modal, Header, List, Segment, Dropdown, Radio} from 'semantic-ui-react'

import styles from './markers-graph.css'

class AdminMarkersGraph extends Component {

  componentWillMount() {
    if (!this.props.auth.token) {
      browserHistory.push('/admin/sign-in')
    }
  }

  componentDidMount() {
    var trace1 = {
      x: [3],
      y: [100],
      mode: 'markers',
      type: 'scatter',
      marker: {
        color: '#646464',
        size: 33
      }
    };

    var trace2 = {
      x: [1, 1.5, 2.5, 3.5, 4.5, 5.5, 1.2, 1.7, 2.7, 3.8, 4.3, 5.6, .6, 1.6, 2.3, 3.3, 4.8, 5.9],
      y: [23, 145, 334, 224, 334, 293, 445, 224, 334, 434, 323, 145, 344, 504, 234],
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 15,
        color: '#646464'
      }
    };

    var trace3 = {
      x: [1, 1.5, 2.5, 3.5, 4.5, 5.5, 1.2, 1.7, 2.7, 3.8, 4.3, 5.6, .6, 1.6, 2.3, 3.3, 4.8, 5.9],
      y: [223, 175, 234, 394, 174, 195, 345, 474, 234, 34, 123, 475, 254, 594, 234],
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 15,
        color: '#c8c8c8'
      }
    };

    var data = [ trace1, trace2, trace3 ];

    var layout = {
      margin: {
        l: 30,
        r: 30,
        t: 30,
        b: 30
      },
      xaxis: {
        linecolor: 'rgb(238, 238, 238)',
        zerolinecolor: 'rgb(238, 238, 238)'
      },
      yaxis: {
        linecolor: 'rgb(238, 238, 238)',
        zerolinecolor: 'rgb(238, 238, 238)'
      },
      showlegend: false
    };

    Plotly.newPlot('graph', data, layout, {
      displayModeBar: false
    });
  }

  render() {
    return (
      <div>
        <Dropdown text='Waist Size' icon='chevron down' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Item>Blood Pressure</Dropdown.Item>
            <Dropdown.Item>Waist Size</Dropdown.Item>
            <Dropdown.Item>HDL</Dropdown.Item>
            <Dropdown.Item>A1C</Dropdown.Item>
            <Dropdown.Item>Triglycerides</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div id="graph">
        </div>
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
)(AdminMarkersGraph)
