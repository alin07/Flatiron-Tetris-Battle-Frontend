// let gridState = {
//   rows: new Array(20),
//   currentPiece: {},
//   referencePoint: [0,5],
//   holdPiece: {},
//   queueOfPieces: [],
//   rotationAngle: 1
// }
//
// const grid = (state = gridState, action) => {
//   switch(action.type){
//     case 'PLACE_PIECE':
//       let tetris = state.payload.currentPiece
//       const coord = state.payload.referencePoint
//
//       if(!tetris.pieces || tetris.pieces.length < 1){
//         tetris.pieces = getNextPiece()
//       }
//
//       state.payload.rows[coord[0]][coord[1]] = tetris.color
//       for(let i = 0; i < tetris.pieces.length; i++){
//         if(canPlacePiece(coord, tetris.pieces[i])) {
//           state.payload.rows[coord[0] + tetris.pieces[i][0]][coord[1] + tetris.pieces[i][1]] = tetris.color
//         }
//       }
//       return { ...state.payload, rows }
//     case 'REMOVE_PIECE':
//       return
//     case 'MOVE_HORIZONTALLY':
//       return
//     case 'MOVE_DOWN':
//       return
//     case 'ROTATE':
//       return
//     case 'SET_UP_GRID':
//       return
//     case 'SET_UP_QUEUE':
//       return
//     case 'RESET_TETROMINO_STATE':
//       return
//     case 'ADD_NEW_PIECE':
//       return
//     default:
//       return state
//   }
// }
//
//
// getNextPiece = () => {}
// canPlacePiece = (coord, piece) => {}
// getNextPiece = () => {}
// getNextPiece = () => {}
// getNextPiece = () => {}
// getNextPiece = () => {}
//
//
// // updateBoard - game loop
// // keyboard event
//
//
//
// // this.state = {
// //   rows: new Array(20),
// //   currentPiece: [],
// //   referencePoint: [0,5],
// //   holdPiece:[],
// //   queueOfPieces: [],
// //   rotationAngle: 1
// // }
// //
// // componentDidMount
// //
// // placePiece
// //
// // canPlacePiece
// //
// // removePiece
// //
// // moveHorizontally
// //
// // canMoveHorizontally
// //
// // updateBoard
// //
// // setUpGrid
// //
// // rotate
// //
// // addNewPiece
// //
// // isGameOver
// //
// // setUpQueue
// //
// // shuffleQueue
// //
// // getNextPiece
// //
// // hasReachedBottom
// //
// // hasReachedLeftWall
// //
// // hasReachedRightWall
// //
// // getTetrominoGridValue
// //
// // hasPieceDirectlyBelow
// //
// // isIrrelevantPiece
// //
// // hasCellDirectlyBelow
// //
// // hasCellDirectlyHorizontal
// //
// // moveDown
// //
// // isRowCompleted
// //
// // resetTetrominoState
// //
// // keyboardEvent
// //
// // getBottomMostRow
