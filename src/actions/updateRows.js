import { UPDATE_ROWS } from './types'

export default function updateRows(rows, referencePoint, userId) {
  return dispatch => {
    dispatch(updateRowsAsync(rows, referencePoint, userId))
  }
}

const updateRowsAsync = (rows, referencePoint, userId) => {
  return {
    type: UPDATE_ROWS,
    userId: userId,
    payload: {
      rows,
      referencePoint
    }
  }
}
