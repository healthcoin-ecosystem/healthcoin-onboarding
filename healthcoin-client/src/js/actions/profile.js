import * as profileActions from '../constants/profile-actions'
import * as api from '../data/api'

const requestUpdateProfile = user => ({
  type: profileActions.INIT,
  user
})

const echo = (type, payload) => ({
  type,
  payload
})

const failed = json => ({
  type: profileActions.FAILED,
  payload: json
})

export const update = (user, token) => {
  return dispatch => {
    dispatch(requestUpdateProfile(user))
    return api.baseCall(`users/${user._id}`, 'PATCH', user, token)
      .then(json => {
        dispatch(json.hasOwnProperty('errors') ? failed(json) : echo(profileActions.UPDATED, json))
      })
      .catch(json => failed(json))
  }
}
