import { SET_ROWS } from './types'

export default function(rows, user) {
  return {
    type: SET_ROWS,
    userId: user,
    payload: rows
  }
}
