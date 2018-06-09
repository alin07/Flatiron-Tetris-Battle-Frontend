import { GET_ALL_USERS_BY_IDS, LOGIN } from '../actions/types'

const initState = {
  users: []
}

const users = (state = initState, action) => {
  switch(action.type) {
    case GET_ALL_USERS_BY_IDS:
      return {...state, }
    default:
      return state
  }
}

export default users
