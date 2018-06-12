import { TOGGLE_READY,
         GET_ALL_USERS } from '../actions/types'

const initState = {
  users: [],
}

const users = (state = initState, action) => {
  switch(action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload.map(u => ({ ...u, isReady: false })) }
    case TOGGLE_READY:
      const allUsers = Object.assign([], state.users)
      allUsers.find(u => u._id === action.payload.userId).isReady = action.payload.toggle
      return { ...state, users: [...allUsers] }
    default:
      return state
  }
}

export default users
