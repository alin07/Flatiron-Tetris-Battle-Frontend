import { TOGGLE_READY } from './types'

export default function toggleReady(userId, toggle) {
  return {
    type: TOGGLE_READY,
    userId: userId,
    payload: {
      userId,
      toggle
    }
  }
}
