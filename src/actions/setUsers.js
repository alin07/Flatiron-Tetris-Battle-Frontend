import { SET_USERS } from './types'

export default function setUsers(users, userId) {
  return dispatch => {
    dispatch(setUsersAsync(users, userId))
  }
}

const setUsersAsync = (users, userId) => {
  return {
    type: SET_USERS,
    userId: userId,
    payload: {
      users
    }
  }
}
