import { SETUP_QUEUE } from './types'

export default function setUpQueue(queue, userId) {
  return dispatch => {

    dispatch(setUpQueueAsync(queue, userId))
  }
}

const setUpQueueAsync = (queue, userId) => {
  return {
    type: SETUP_QUEUE,
    userId: userId,
    payload: queue
  }
}
