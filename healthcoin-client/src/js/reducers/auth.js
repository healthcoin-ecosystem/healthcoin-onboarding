import {
  SIGN_IN,
  SIGNED_IN,
  FAILED,
  SIGN_UP,
  SIGNED_UP,
  SIGNED_OUT,
  CLEAR_ERROR_MESSAGES
} from '../constants/auth-actions'

const initialState = {
  isProcessing: false,
  currentUser: JSON.parse(localStorage.currentUser || '{}'),
  token: localStorage.token
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case SIGN_UP:
      return Object.assign({}, state, {
        isProcessing: true
      })
    case SIGNED_IN:
      return {
        isProcessing: false,
        currentUser: action.payload.data,
        token: action.payload.token
      }
    case SIGNED_UP:
      return {
        isProcessing: false,
        currentUser: action.payload
      }
    case SIGNED_OUT:
      return Object.assign({}, state, {
        token: null,
        currentUser: null
      })
    case FAILED:
      return {
        isProcessing: false,
        error: {
          message: action.payload.message
        }
      }
    case CLEAR_ERROR_MESSAGES:
      return Object.assign({}, state, {
        error: null
      })
    default:
      return state
  }
}
