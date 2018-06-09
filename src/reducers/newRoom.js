import { SET_NEW_ROOM } from '../actions/types'

const initState = {
  name: ""
}

const newRoom = (state = initState, action) => {
  switch(action.type) {
    case SET_NEW_ROOM:
      console.log('setting new room: ', action)
      return { name: action.payload }
    default:
      return state
  }
}

export default newRoom
