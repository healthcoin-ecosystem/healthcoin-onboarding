import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import DevTools from './dev-tools'
import routes from '../routes'

export default class App extends Component {
  render() {
    const {store} = this.props
    const history = syncHistoryWithStore(browserHistory, store)
    return (
      <div>
        <Provider store={store}>
          <Router history={history} routes={routes}/>
        </Provider>
        <DevTools store={ store }/>
      </div>
    );
  }
}
