import { CREATE_ROOM } from './types'

export default function createRoom(event) {
  const id = localStorage.userId ? localStorage.userId : "5b15c5d330572feef795c384"
  const username = localStorage.username ? localStorage.username : "test01"
  const room = { name: event.target.querySelector('input').value, host: id, users: [id] }
  console.log(room)

  return dispatch => {
    fetch('http://localhost:3000/api/v1/rooms', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    }).then(r => r.json()).then(r => {
      dispatch(createRoomAsync(r))
      // send websockets
    })
  }
}

const createRoomAsync = (room) => {
  return {
    type: CREATE_ROOM,
    payload: room
  }
}
