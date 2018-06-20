import { RESET_TETRO } from './types'

export default function resetTetro(referencePoint, rotationAngle, userId) {
  return dispatch => {
    dispatch(resetTetroAsync(referencePoint, rotationAngle, userId))
  }
}

const resetTetroAsync = (referencePoint, rotationAngle, userId) => {
  return {
    type: RESET_TETRO,
    userId: userId,
    payload: {
      referencePoint,
      rotationAngle
    }
  }
}
