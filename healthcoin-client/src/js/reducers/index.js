import {combineReducers} from 'redux'
import auth from './auth'
import global from './global'
import {routerReducer} from 'react-router-redux'

const rootReducer = combineReducers({
  global,
  auth,
  routing: routerReducer
})

export default rootReducer
