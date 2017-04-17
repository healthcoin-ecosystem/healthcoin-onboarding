import {combineReducers} from 'redux'
import auth from './auth'
import global from './global'
import marker from './marker'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
  global,
  auth,
  marker,
  routing: routerReducer
})

export default rootReducer
