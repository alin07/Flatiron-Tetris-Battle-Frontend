import { SETUP_QUEUE } from './types'

export default function setUpQueue(tetrominoes, userId) {
  return dispatch => {
    const keys = Object.keys(tetrominoes);
    let queue = []
    const that = this
    keys.forEach(k => {
      for(let i = 0; i < 2; i++){
        queue.push(tetrominoes[k].blocks)
      }
    })
    queue = shuffleQueue(queue)
    dispatch(setUpQueueAsync(queue, userId))
  }
}

const shuffleQueue = (queue) => {
  let ran = 0
  let temp = 0
  for(let i = 0; i < queue.length; i++){
    ran = Math.floor(Math.random() * (queue.length))
    temp = queue[i]
    queue[i] = queue[ran]
    queue[ran] = temp
  }
  return queue
}

const setUpQueueAsync = (queue, userId) => {
  return {
    type: SETUP_QUEUE,
    userId: userId,
    payload: queue
  }
}
