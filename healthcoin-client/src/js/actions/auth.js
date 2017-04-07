import * as authActions from '../constants/auth-actions'
import _ from 'lodash'
import * as api from '../data/api'

const requestSignIn = (user) => ({
  type: authActions.SIGN_IN,
  user
})

const requestSignUp = (user) => ({
  type: authActions.SIGN_UP,
  user
})

const echo = (type, payload) => ({
  type,
  payload
})

const failed = (json) => ({
  type: authActions.FAILED,
  payload: json
})

export const signIn = (user) => {
  return dispatch => {
    dispatch(requestSignIn(user))
    return api.baseCall('auth/local', 'POST', user)
      .then(json => {
        if (_.has(json, 'errors')) {
          dispatch(failed(json))
        } else {
          localStorage.token = json.token;
          localStorage.currentUser = JSON.stringify(json.data);
          dispatch(echo(authActions.SIGNED_IN, json))
        }
      })
      .catch(json => {
        dispatch(failed(json))
      })
  }
}

export const signUp = (user) => {
  return dispatch => {
    dispatch(requestSignUp())
    return api.baseCall('users', 'POST', user)
      .then(json => {
        if (_.has(json, 'errors')) {
          dispatch(failed(json))
        } else {
          dispatch(signIn(user))
          dispatch(echo(authActions.SIGNED_UP, json))
        }
      })
      .catch(json => dispatch(failed(json)))
  }
}

export const clearErrorMessages = () => {
  return dispatch => {
    dispatch({
      type: authActions.CLEAR_ERROR_MESSAGES
    })
  }
}
