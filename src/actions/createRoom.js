import { CREATE_ROOM } from './types'

export default function createRoom(name) {
  const id = localStorage.userId
  const username = localStorage.username
  const room = { name: name, host: id, users: [id] }
  console.log(room)
  return dispatch => {
    fetch('https://flatiron-tetris-battle-backend.herokuapp.com/api/v1/rooms', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(room)
    }).then(r => r.json()).then(r => {
      dispatch(createRoomAsync(r))
      return r
    }).then((r) => {

       window.location.href = 'https://flatiron-battle-tetris.herokuapp.com/r/'+r._id
    })
  }
}

const createRoomAsync = (room) => {
  return {
    type: CREATE_ROOM,
    payload: room
  }
}
