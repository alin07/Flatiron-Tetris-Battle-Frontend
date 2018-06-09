import { GET_ALL_ROOMS } from './types'

export default function getAllRooms() {
  return dispatch => {
    console.log('creating room async')
    fetch('http://localhost:3000/api/v1/rooms/')
      .then(r => r.json())
      .then(res => {
        console.log("in the fetch request", {rooms: res})
        dispatch(getAllRoomsAsync({rooms: res}))
    })
  }
}

const getAllRoomsAsync = (rooms) => {
  return {
    type: GET_ALL_ROOMS,
    payload: rooms
  }
}
