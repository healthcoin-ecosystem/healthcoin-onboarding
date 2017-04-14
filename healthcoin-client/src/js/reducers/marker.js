import * as actions from '../constants/marker-actions'

const initialState = {
  isProcessing: false,
  marker: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case actions.REQUEST_ADD_MARKER:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case actions.ADDED_MARKER:
      return Object.assign({}, state, {
        isProcessing: false,
        marker: action.payload
      })
    case actions.FAILED:
      return {
        isProcessing: false,
        error: {
          message: action.payload.message
        }
      }
    case actions.REQUEST_USER_MARKER_TYPES:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case actions.GOT_USER_MARKER_TYPES:
      return Object.assign({}, state, {
        isProcessing: false,
        markers: action.payload.data,
        history: action.payload.history
      })
    default:
      return state
  }
}
