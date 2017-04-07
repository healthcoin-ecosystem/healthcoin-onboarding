import {persistState} from 'redux-devtools'

import {createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import DevTools from '../containers/dev-tools'

const enhancer = compose(
  applyMiddleware(thunkMiddleware, createLogger()),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancer
  )

  return store
}
