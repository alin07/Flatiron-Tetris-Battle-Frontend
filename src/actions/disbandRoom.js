import { DISBAND_ROOM } from './types'

export default function disbandRoom(roomId) {
  return dispatch => {
    fetch('https://flatiron-tetris-battle-backend.herokuapp.com/api/v1/rooms/'+roomId, {
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
