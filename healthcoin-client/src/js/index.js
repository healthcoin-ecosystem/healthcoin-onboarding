import React from 'react'
import {render} from 'react-dom'

import App from './containers/app'
import configureStore from './store/configure-store'

import './utils/promise-polyfill'
import '../styles/normalize.less'
import '../styles/overwritten.less'
import '../styles/base.less'
import '../styles/layout.less'

const store = configureStore()

render(
  <div id="main-content">
    <App store={ store }/>
  </div>,
  document.getElementById('healthcoin')
)
