import { REGISTER } from './types'

export default function register(event) {
  return dispatch => {
    fetch('https://flatiron-tetris-battle-backend.herokuapp.com/login', {
      method:'POST',
      headers: { //
        'Content-Type': 'application/json'
      },
      body: {}
    }).then(r => r.json()).then(r => {
      console.log(r)
      dispatch(registerAsync(r))
      // send websockets
    })
  }
}

const registerAsync = (user) => {

  return {
    type: REGISTER,
    payload: user
  }
}
