import { SETUP_ROWS } from './types'

export default function setUpRows(userId) {
  return dispatch => {
    let result = new Array(20)
    let i = 0
    let j = 0
    for (i = 0; i < result.length; i++) {
      result[i] =  new Array(10)
      for(j = 0; j < result[i].length; j++){
        result[i][j] = 0
      }
    }
    dispatch(setUpRowsAsync(result, userId))
  }
}

const setUpRowsAsync = (rows, userId) => {
  return {
    type: SETUP_ROWS,
    userId: userId,
    payload: rows
  }
}
