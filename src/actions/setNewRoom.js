import { SET_NEW_ROOM } from './types'

export default function(event) {
  return {
    type: SET_NEW_ROOM,
    payload: event.target.value
  }
}
