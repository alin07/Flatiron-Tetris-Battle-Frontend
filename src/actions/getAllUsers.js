import { GET_ALL_USERS } from './types'

export default function getAllUsers(id, hostId) {
  return dispatch => {
    fetch('http://192.168.5.194:3000/api/v1/users/'+id)
      .then(r => r.json())
      .then(r => {
        dispatch(getAllUsersAsync(r, hostId))
      })
  }
}

const getAllUsersAsync = (users, hostId) => {

  return {
    type: GET_ALL_USERS,
    hostId: hostId,
    payload: users
  }
}
