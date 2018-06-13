import { JOIN_ROOM, GET_ALL_USERS } from './types'

export default function joinRoom(userId, roomId) {
  //.put(room.join_room) -- /api/v1/rooms
  return dispatch => {
    fetch('http://localhost:3000/api/v1/rooms/',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        roomId: roomId
      })
    })
      .then(r => r.json())
      .then(res => {
        dispatch(joinRoomAsync(res))
        fetch('http://localhost:3000/api/v1/users/'+roomId)
          .then(r => r.json())
          .then(r => {
            dispatch(getAllUsersAsync(r))
          })
      })
  }
}

const joinRoomAsync = (room) => {
  return {
    type: JOIN_ROOM,
    payload: room
  }
}

const getAllUsersAsync = (users) => {
  return {
    type: GET_ALL_USERS,
    payload: users
  }
}
