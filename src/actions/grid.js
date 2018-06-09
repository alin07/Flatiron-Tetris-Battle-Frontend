
export const setUpGrid = (rows) => {
  type: 'SET_UP_GRID',
  payload: {
    rows
  }
}

export const placePiece = (rows, color, piece) => {

}

export const removePiece = () => {}
export const moveHorizontally = () => {}
export const moveDown = () => {}
export const rotate = () => {}
export const setUpQueue = () => {}
export const resetTetrominoState = () => {}
export const addNewPiece = () => {}


// case 'PLACE_PIECE':
//   return
// case 'REMOVE_PIECE':
//   return
// case 'MOVE_HORIZONTALLY':
//   return
// case 'MOVE_DOWN':
//   return
// case 'ROTATE':
//   return
// case 'SET_UP_GRID':
//   return
// case 'SET_UP_QUEUE':
//   return
// case 'RESET_TETROMINO_STATE':
//   return
// case 'ADD_NEW_PIECE':
//   return

//-----------------------
//
// this.state = {
//   rows: new Array(20),
//   currentPiece: [],
//   referencePoint: [0,5],
//   holdPiece:[],
//   queueOfPieces: [],
//   rotationAngle: 1
// }
//
// componentDidMount
//
// placePiece
//
// canPlacePiece
//
// removePiece
//
// moveHorizontally
//
// canMoveHorizontally
//
// updateBoard
//
// setUpGrid
//
// rotate
//
// addNewPiece
//
// isGameOver
//
// setUpQueue
//
// shuffleQueue
//
// getNextPiece
//
// hasReachedBottom
//
// hasReachedLeftWall
//
// hasReachedRightWall
//
// getTetrominoGridValue
//
// hasPieceDirectlyBelow
//
// isIrrelevantPiece
//
// hasCellDirectlyBelow
//
// hasCellDirectlyHorizontal
//
//
// moveDown
//
// isRowCompleted
//
// resetTetrominoState
//
// keyboardEvent
//
// getBottomMostRow
