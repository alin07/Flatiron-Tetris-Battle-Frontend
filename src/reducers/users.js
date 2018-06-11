import { TOGGLE_READY,
         GET_ALL_USERS } from '../actions/types'

const initState = {
  users: []
}

const users = (state = initState, action) => {
  switch(action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload.map(u => ({ ...u, isReady: false })) }
    case TOGGLE_READY:
      const index = state.users.map(u => u._id).indexOf(action.payload.userId)
      const user = state.users.find(u => u._id === action.payload.userId)
      let result = []
      user.isReady = action.payload.toggle
      if(state.users.slice(index-1, state.users.length - index).length > 0){
        result = [ ...result, ...state.users.slice(index-1, state.users.length - index) ]
      }
      result.push(user)
      if(state.users.slice(index+1, state.users.length - index).length > 0){
        result = [ ...result, ...state.users.slice(index+1, state.users.length - index) ]
      }
      debugger
      return { ...state, users: [...result] }
    default:
      return state
  }
}

export default users
