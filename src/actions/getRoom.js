import { GET_ROOM } from './types'

export default function getRoom(id) {
  return dispatch => {
    fetch('http://192.168.5.194:3000/api/v1/rooms/'+id)
      .then(r => r.json())
      .then(r => {
        dispatch(getRoomAsync(r))
      })
  }
}

const getRoomAsync = (users) => {

  return {
    type: GET_ROOM,
    payload: users
  }
}
