import * as actions from '../constants/marker-actions'
import _ from 'lodash'
import * as api from '../data/api'

const requestAddMarker = (marker) => ({
  type: actions.REQUEST_ADD_MARKER,
  marker
})

const requestUserMarkerTypes = () => ({
  type: actions.REQUEST_USER_MARKER_TYPES
})

const requestCohortMarkerTypes = () => ({
  type: actions.REQUEST_COHORT_MARKER_TYPES
})

const echo = (type, payload) => ({
  type,
  payload
})

const failed = (json) => ({
  type: actions.FAILED,
  payload: json
})

export function resetDemoBiodata() {
  return dispatch => {
    return api.baseCall('biodata', 'POST', { demo: true })
      .then(json => {
        if (_.has(json, 'errors')) {
          dispatch(failed(json))
        } else {
          //dispatch(echo(actions.ADDED_MARKER, json))
          //dispatch(getUserMarkerTypes())
        }
        window.location = window.location;
      })
      .catch(json => {
        dispatch(failed(json))
      });
  };
}

export const addMarker = (id, marker) => {
  return dispatch => {
    dispatch(requestAddMarker(marker))
    return api.baseCall(`biodata/${id}`, 'GET')
      .then(json => {
        let newDataArray = [...json.data, marker]
        return api.baseCall(`biodata/${id}`, 'PATCH', {data: newDataArray})
          .then(json => {
            if (_.has(json, 'errors')) {
              dispatch(failed(json))
            } else {
              dispatch(echo(actions.ADDED_MARKER, json))
              dispatch(getUserMarkerTypes())
            }
          })
          .catch(json => {
            dispatch(failed(json))
          })
      })
  }
}

export const getUserMarkerTypes = () => {
  return dispatch => {
    dispatch(requestUserMarkerTypes())
    return api.baseCall('biodata?$limit=', 'GET')
      .then(json => {
        if (_.has(json, 'errors')) {
          dispatch(failed(json))
        } else {
          let markers = []
          json.data.forEach(t => {
            t.data.forEach(marker => {
              markers.push({
                type: t.type,
                value: marker.value,
                date: new Date(marker.date)
              })
            })
          })
          markers.sort((a, b) => b.date - a.date)
          json.history = markers
          dispatch(echo(actions.GOT_USER_MARKER_TYPES, json))
        }
      })
      .catch(json => {
        dispatch(failed(json))
      })
  }
}

export const getCohortMarkerTypes = () => {
  return dispatch => {
    dispatch(requestCohortMarkerTypes())
    return api.baseCall('biodata?cohort=true', 'GET')
      .then(json => {
        if (_.has(json, 'errors')) {
          dispatch(failed(json))
        } else {
          let markers = []
          json.data.forEach(t => {
            t.data.forEach(marker => {
              markers.push({
                type: t.type,
                value: marker.value,
                date: new Date(marker.date)
              })
            })
          })
          markers.sort((a, b) => b.date - a.date)
          json.history = markers
          dispatch(echo(actions.GOT_COHORT_MARKER_TYPES, json))
        }
      })
      .catch(json => {
        dispatch(failed(json))
      })
  }
}

export const cleanupMarkers = () => ({
  type: actions.CLEANUP_MARKERS
})
