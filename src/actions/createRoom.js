import { CREATE_ROOM } from './types'

export default function createRoom(name) {
  const id = localStorage.userId
  const room = { name: name, host: id, users: [id] }
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
       window.location.href = 'https://flatiron-developers.herokuapp.com/r/'+r._id
    })
  }
}

const createRoomAsync = (room) => {
  return {
    type: CREATE_ROOM,
    payload: room
  }
}
