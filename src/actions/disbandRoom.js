import { DISBAND_ROOM } from './types'

export default function disbandRoom(roomId) {
  return dispatch => {
    fetch('http://192.168.5.194:3000/api/v1/rooms/'+roomId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomId })
    })
      .then(r => r.json())
      .then(res => {
        dispatch(disbandRoomAsync(res))
    })
  }
}

const disbandRoomAsync = (roomId) => {
  return {
    type: DISBAND_ROOM,
    payload: roomId
  }
}
