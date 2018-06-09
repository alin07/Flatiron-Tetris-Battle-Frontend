import { LOGIN } from './types'
import axios from 'axios'

export default function login(event) {
  const inputs = event.target.querySelectorAll('input')
  return dispatch => {

  }
}

const loginAsync = (user) => {

  return {
    type: LOGIN,
    payload: user
  }
}
