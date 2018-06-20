import { NEXT_QUEUE } from './types'

export default function nextQueue(user) {
  return dispatch => {

    dispatch(nextQueueAsync(user))
  }
}


const nextQueueAsync = (user) => {
  return {
    type: NEXT_QUEUE,
    userId: user,
    payload: {
      userId: user
    }
  }
}
