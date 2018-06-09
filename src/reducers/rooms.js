import { CREATE_ROOM,
         GET_ALL_ROOMS,
         LEAVE_ROOM,
         DISBAND_ROOM,
         SET_ROOM_STATUS } from '../actions/types'

const initState = {
  rooms: []
}

const rooms = (state = initState, action) => {
  switch(action.type) {
    case CREATE_ROOM:
      console.log("action payload",action.payload)
      return {...state, rooms: [...state.rooms, action.payload]}
    case GET_ALL_ROOMS:
      return action.payload ? action.payload : state
    case LEAVE_ROOM:
      console.log('leave room!')
      return null
    case DISBAND_ROOM:
      console.log('disband room!')
      return null
    case SET_ROOM_STATUS:
      console.log('set room status!')
      return null
    default:
      return state
  }
}

export default rooms
