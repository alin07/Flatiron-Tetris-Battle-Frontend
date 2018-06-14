import { LEAVE_ROOM } from './types'

export default function leaveRoom(roomId, userId) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/rooms/'+roomId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomId, userId })
    })
      .then(r => r.json())
      .then(res => {
        dispatch(leaveRoomAsync(res))
    })
  }
}

const leaveRoomAsync = (roomId) => {
  return {
    type: LEAVE_ROOM,
    payload: roomId
  }
}
