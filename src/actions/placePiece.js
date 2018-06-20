import { PLACE_PIECE } from './types'

export default function placePiece(rows, currentPiece, userId, referencePoint) {
  return dispatch => {
    // remove pieces
    placePiece(currentPiece, rows, referencePoint, 0)
    // set the reference point
    const point = 
    // place new piece based on change

    dispatch(placePieceAsync(queue, userId))
  }
}

const canPlacePiece = (coord, piece, i) => {
  return coord[0] + piece[i][0] > -1 && coord[1] + piece[i][1] >= 0 && coord[1] + piece[i][1] < 10
}

const placePiece = (piece, rows, coord, color) => {
  rows[coord[0]][coord[1]] = color
  for(let i = 0; i < piece.length; i++){
    if(this.canPlacePiece(coord, piece, i)) {
      rows[coord[0] + piece[i][0]][coord[1] + piece[i][1]] = color
    }
  }
}

const placePieceAsync = (queue, userId) => {
  return {
    type: PLACE_PIECE,
    userId: userId,
    payload: queue
  }
}
