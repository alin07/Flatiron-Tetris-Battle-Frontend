import { UPDATE_CONNECTION } from './types'

export default function updateConnection(userId) {
  return dispatch => {
    dispatch(updateConnectionAsync(userId))
  }
}

const updateConnectionAsync = (userId) => {
  return {
    type: UPDATE_CONNECTION,
    userId: userId,
    payload: {
      userId: userId
    }
  }
}
