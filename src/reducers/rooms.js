import { CREATE_ROOM,
         GET_ALL_ROOMS,
         JOIN_ROOM,
         LEAVE_ROOM,
         DISBAND_ROOM } from '../actions/types'

const initState = {
  rooms: []
}

const rooms = (state = initState, action) => {
  switch(action.type) {
    case CREATE_ROOM:
      return { ...state, rooms: [...state.rooms, action.payload] }
    case GET_ALL_ROOMS:
      return { rooms: [...action.payload] }
    case JOIN_ROOM:
      return { rooms: [ ...state.rooms.filter(r => r._id !== action.payload._id), action.payload ] }
    case DISBAND_ROOM:
      return { rooms: [ ...state.rooms.filter(r => r._id !== action.payload) ] }
    case LEAVE_ROOM:
      return { rooms: [ ...state.rooms.filter(r => r._id !== action.payload._id && r), action.payload ] }
    default:
      return state
  }
}

export default rooms
