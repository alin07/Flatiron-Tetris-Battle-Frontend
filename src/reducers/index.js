import { combineReducers } from 'redux'
// import UserReducer from './user'
import RoomsReducer from './rooms'
import UsersReducer from './users'
import RoomNameReducer from './newRoom'
import MessagesReducer from './messages'


const reducers = combineReducers({
  rooms: RoomsReducer,
  users: UsersReducer,
  roomName: RoomNameReducer,
  messages: MessagesReducer
})

export default reducers;
