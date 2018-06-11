import { TOGGLE_READY } from './types'

export default function toggleReady(userId, toggle) {
  return {
    type: TOGGLE_READY,
    payload: {
      userId,
      toggle
    }
  }
}
