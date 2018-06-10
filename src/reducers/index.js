import { combineReducers } from 'redux'
// import UserReducer from './user'
import RoomsReducer from './rooms'
import UsersReducer from './users'
import RoomNameReducer from './newRoom'


const reducers = combineReducers({
  rooms: RoomsReducer,
  users: UsersReducer,
  roomName: RoomNameReducer
})

export default reducers;
