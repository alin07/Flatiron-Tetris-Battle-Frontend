import { CREATE_ROOM } from './types'

export default function createRoom(event) {
  const id = localStorage.userId
  const username = localStorage.username
  const room = { name: event.target.querySelector('input').value, host: id, users: [id] }
  console.log(room)

  return dispatch => {
    fetch('http://192.168.5.194:3000/api/v1/rooms', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    }).then(r => r.json()).then(r => {
      dispatch(createRoomAsync(r))
      return r
    }).then((r) => {
       window.location.href = 'http://localhost:3001/r/'+r._id
    })
  }
}

const createRoomAsync = (room) => {
  return {
    type: CREATE_ROOM,
    type: CREATE_ROOM,
    payload: room
  }
}
