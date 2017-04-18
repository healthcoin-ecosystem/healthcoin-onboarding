import {persistState} from 'redux-devtools'

import {createStore, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
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
