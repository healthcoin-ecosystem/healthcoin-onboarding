import fetch from 'isomorphic-fetch'
import config from '../config'

const apiHost = config.endpoints.apiHost


const timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("API Timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const baseCall = (endPoint, method, payload) => {
  return timeout(5000, fetch(`${apiHost}/${endPoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `bearer ${localStorage.token || ''}`
    },
    body: JSON.stringify(payload)
  }).then(response => response.json()))
}
