import React, {Component} from "react"
import ReactDom from 'react-dom';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as markerActions from '../../actions/marker'
import {browserHistory} from 'react-router'
import DashboardHeader from '../partials/header'
import ProgressBar from '../partials/progress-bar'
import Sidebar from '../partials/sidebar'
import RewardsCard from './rewards-card'
import PerformanceCard from './performance-card'
import ClinicalTrialCard from './clinical-trial-card'
import {Card, Segment, Dropdown, Radio} from 'semantic-ui-react'
import moment from 'moment'

import styles from './index.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.valuesLabel = {
      'a1c': 'Blood Glucose Level',
      'trigylcerides': 'Triglyceride Level',
      'hdl': 'HDL Levels',
      'waist': 'Inches',
      'blood pressure': 'Systolic / Diastolic pressure'
    };
    this.plotTypes = {
      'a1c': 'area',
      'trigylcerides': 'area',
      'hdl': 'area',
      'waist': 'area',
      'blood pressure': 'area'
    };
    this.showBadges = {
      'a1c': true,
      'trigylcerides': true,
      'hdl': true,
      'waist': true,
      'blood pressure': false
    };
    this.dataLimits = {
      'a1c': [4, 6],
      'trigylcerides': [140, 160],
      'hdl': [60, 150],
      'waist': [30, 40],
      'blood pressure': ['120/90', '170/130']
    }

    this.state = {
      type: {},
      types: []
    }

    // TODO once tabs are excluded from router, remove this block
    const {markers} = props.marker;
    if(markers) {
      const types = markers.map(m => ({
        key: m.type,
        text: m.type,
        value: m._id
      }));

      if(types.length > 0) {
        this.state = {
          type: types[0],
          types
        };
      }
    }
  }

  componentWillMount() {
    //if (!this.props.auth.token) {
    //  browserHistory.push('/sign-in');
    //}

    const {markers} = this.props.marker
    if (!markers) {
      this.props.actions.getUserMarkerTypes()
    }
  }

  generateGroupData(data, type) {
    return [];

    const min = this.dataLimits[type][0];
    const max = this.dataLimits[type][1];

    if(type === 'blood pressure') {
      const mins = min.split('/').map(num => parseInt(num));
      const maxs = max.split('/').map(num => parseInt(num));
      const avgs = [(maxs[0] + mins[0]) / 2, (maxs[1] + mins[1]) / 2];

      return data.map(d => {
        const nums = d.value.toString().split('/').map(num => parseInt(num));

        let value = (nums[0] < mins[0] ? mins[0] : (nums[0] > maxs[0] ? maxs[0] : avgs[0]));
        if(nums.length > 1) {
          value += '/' + (nums[1] < mins[1] ? mins[1] : (nums[1] > maxs[1] ? maxs[1] : avgs[1]));
        }

        return {
          date: d.date,
          value
        };
      });
    }
    else {
      const avg = (max + min) / 2;

      return data.map(d => ({
        date: d.date,
        value: d.value < min ? min : (d.value > max ? max : avg)
      }));
    }
  }

  onPlotMount() {
    const {markers} = this.props.marker;
    if(!markers) {
      return
    }

    const marker = markers.find(m => m._id === this.state.type.value);

    if(!marker) {
      return;
    }

    const data = marker.data || [];
    const {type} = this.state;
    const typeName = type.text.toLowerCase();

    let values1 = {
      x: data.map(d => d.date).sort(),
      type: this.plotTypes[typeName],
      hoverinfo: 'x+name+y+text',
      showlegend: true,
      marker: {
        color: '#6a15c6',
        size: 10,
      },
      line: {
        shape: 'spline'
      }
    };
    let values2 = Object.assign({}, values1);
    values2.x = [];
    values2.marker = {
      color: '#a23bc5',
      size: 10,
    };

    let badges1 = {
      name: "Badge Earned",
      type: 'scatter',
      hoverinfo: 'none',
      showlegend: true,
      marker: {
        color: '#6a15c6',
        size: 16,
        symbol: 'circle-open-dot',
        opacity: '1'
      },
      line: {
        width: '0'
      }
    };
    let badges2 = Object.assign({}, badges1);
    badges2.marker = {
        color: '#a23bc5',
        size: 16,
        symbol: 'circle-open-dot',
        opacity: '1'
    };
    if(this.showBadges[typeName]) {
      badges1.x = [values1.x[data.length - 2]];
    }

    const groupData = this.generateGroupData(data, typeName);
    let groupValues1 = {
      x: groupData.map(d => d.date).sort(),
      type: this.plotTypes[typeName],
      hoverinfo: 'x+name+y+text',
      showlegend: true,
      marker: {
        color: '#1cb5ac',
        size: 10,
      },
      line: {
        shape: 'spline'
      }
    };
    let groupValues2 = Object.assign({}, groupValues1);
    groupValues2.x = [];
    groupValues2.marker = {
      color: '#2987cd',
      size: 10,
    };

    if(typeName === 'blood pressure') {
      values1.y = [];
      values1.name = 'Systolic';
      values2.x = data.map(d => d.date).sort();
      values2.y = [];
      values2.name = 'Diastolic';

      data.forEach(d => {
        const nums = d.value.toString().split('/');
        values1.y.push(nums[0]);

        if(nums.length > 1) {
          values2.y.push(nums[1]);
        }
      });

      groupValues1.y = [];
      groupValues1.name = 'Cohort\'s Systolic';
      groupValues2.x = data.map(d => d.date).sort();
      groupValues2.y = [];
      groupValues2.name = 'Cohort\'s Diastolic';

      groupData.forEach(d => {
        const nums = d.value.toString().split('/');
        groupValues1.y.push(nums[0]);

        if(nums.length > 1) {
          groupValues2.y.push(nums[1]);
        }
      });

      if(this.showBadges[typeName]) {
        badges2.x = [values2.x[data.length - 2]];
        badges1.y = [values1.y[data.length - 2]];
        badges2.y = [values2.y[data.length - 2]];
      }
    }
    else {
      values1.y = data.map(d => d.value);
      values1.name = this.state.type.text;

      if(this.showBadges[typeName]) {
        badges1.y = [values1.y[data.length - 2]];
      }

      groupValues1.y = groupData.map(d => d.value);
      groupValues1.name = 'Cohort\'s ' + this.state.type.text;
    }

    Plotly.newPlot('plot', [values1, values2, groupValues1, groupValues2], {
      margin: {
        l: 40,
        r: 20,
        t: 20,
        b: 30
      },
      xaxis: {
        // tickmode: 'auto',
        // type: 'date',
        // tickfont: {
        //   size: 11
        // },
        // tickformat: '%b %d',
        // hoverformat: '%b %d, %H:%M',
        // nticks: 10
      },
      yaxis: {
        title: this.valuesLabel[typeName],
        titlefont: {
          size: 11
        },
        tickfont: {
          size: 11
        }
      },
      legend: {
        bgcolor: 'transparent',
        orientation: 'h',
        x: '0.5',
        y: '1.08'
      }
    },
    {
      displayModeBar: false
    });
  }

  componentWillReceiveProps(props) {
    if(this.props.marker.isProcessing && !props.marker.isProcessing &&
       this.state.types.length === 0) {
      const markers = props.marker.markers || [];
      const types = markers.map(m => ({
        key: m.type,
        text: m.type,
        value: m._id
      }));

      if(types.length > 0) {
        this.setState({
          type: types[0],
          types
        });
      }
    }
  }

  updateType(e, data) {
    const {types} = this.state;
    const type = types.find(t => t.value === data.value);
    if(type) {
      this.setState({
        type
      });
    }
  }

  render() {
    const {currentUser} = this.props.auth

    return (
      <div>
        <DashboardHeader currentUser={currentUser}></DashboardHeader>
        <ProgressBar></ProgressBar>
        <div className={styles.content + " clearfix restrict-width"}>
          <Sidebar page="dashboard"></Sidebar>
          <div className={styles.dashboard}>
            <Card.Group stackable className={styles.cards}>
              <RewardsCard currentUser={currentUser}></RewardsCard>
              <PerformanceCard></PerformanceCard>
              <ClinicalTrialCard></ClinicalTrialCard>
            </Card.Group>
            <Segment id={styles.graphArea}>
              <Dropdown value={this.state.type.value} options={this.state.types} icon='chevron down' floating labeled button className='icon' onChange={this.updateType.bind(this)}/>
              <div id="plot" ref={plot => this.onPlotMount(ReactDom.findDOMNode(plot))}/>
            </Segment>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state.auth);
  return {
    global: state.global,
    auth: state.auth,
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
)(Dashboard)
