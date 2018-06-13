import { GET_ALL_USERS } from './types'

export default function getAllUsers(id) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/users/'+id)
      .then(r => r.json())
      .then(r => {
        dispatch(getAllUsersAsync(r))
      })
  }
}

const getAllUsersAsync = (users) => {

  return {
    type: GET_ALL_USERS,
    payload: users
  }
}
