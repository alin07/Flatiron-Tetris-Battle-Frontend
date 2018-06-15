import { TOGGLE_READY,
         GET_ALL_USERS,
         SETUP_QUEUE,
         NEXT_QUEUE,
         SETUP_ROWS,
         UPDATE_ROWS,
         UPDATE_REFPOINT,
         UPDATE_HOLDPIECE,
         UPDATE_ROTATIONANGLE,
         UPDATE_CURRENTPIECE,
         UPDATE_CONNECTION,
         RESET_TETRO,
         SET_USERS
         } from '../actions/types'

const initState = {
  users: []
}

const users = (state = initState, action) => {
  let index = state.users.map(u => u._id).indexOf(action.userId)
  let user = state.users.find(u => u._id === action.userId)
  switch(action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload.map(u => ({
         ...u,
         isReady: false,
         queue: [],
         next: [],
         rows: [],
         currentPiece: [],
         referencePoint: [-1,5],
         holdPiece: [],
         rotationAngle: 2,
         gameReady: false
       }))
      }
    case TOGGLE_READY:
      user.isReady = action.payload.toggle
      return updateUser(user, index, state)
    case SET_USERS:
      return {...state, users: action.payload.users }
    case SETUP_QUEUE:
      user.queue = action.payload
      return updateUser(user, index, state)
    case NEXT_QUEUE:
      user.currentPiece = user.queue.shift()
      return updateUser(user, index, state)
    case SETUP_ROWS:
      console.log('setting up rows for '+user+' desu.')
      user.rows = action.payload
      return updateUser(user, index, state)
    case UPDATE_ROWS:
      user.rows = action.payload.rows
      user.referencePoint = action.payload.referencePoint
      return updateUser(user, index, state)
    case RESET_TETRO:
      user.referencePoint = action.payload.referencePoint
      user.rotationAngle = action.payload.rotationAngle
      user.currentPiece = user.queue.shift()
      return updateUser(user, index, state)
    case UPDATE_REFPOINT:
      user = user.find(u => u._id === action.userId)
      user.referencePoint = action.payload
      return updateUser(user, index, state)
    case UPDATE_HOLDPIECE:
      user = user.find(u => u._id === action.userId)
      user.referencePoint = action.payload
      return updateUser(user, index, state)
    case UPDATE_ROTATIONANGLE:
      user = user.find(u => u._id === action.userId)
      user.referencePoint = action.payload
      return updateUser(user, index, state)
    case UPDATE_CURRENTPIECE:
      user.referencePoint = action.payload
      return updateUser(user, index, state)
    case UPDATE_CONNECTION:
      user.gameReady = true
      return updateUser(user, index, state)
    default:
      return state
  }
}


const updateUser = (user, index, state) => {
  let result = []
  if(state.users.slice(0, index).length > 0){
    result = [ ...result, ...state.users.slice(0, index) ]
  }
  result.push(user)
  if(state.users.slice(index+1, state.users.length - index + 1).length > 0){
    result = [ ...result, ...state.users.slice(index+1, state.users.length - index +1) ]
  }
  return { ...state, users: [ ...result ] }
}
export default users
