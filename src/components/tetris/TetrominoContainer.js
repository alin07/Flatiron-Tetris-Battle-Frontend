import React from 'react'
import GridRow from './grid/GridRow'

const TetrominoContainer = (props) => {
  const board = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  const refPoint = [2,2]
  const placedPiece = placePiece(board, refPoint, props.rows)

  const rows = placedPiece.map((g, i) => <GridRow size="small" key={i} row={g} />)
  return (
    <div>
        { rows }
    </div>
  )
}

const placePiece = (board, point, piece) => {
  let blocks = piece.blocks
  if(!blocks || blocks.length < 1){
    return board
  }
  board[point[0]][point[1]] = piece.color
  for(let i = 0; i < blocks.length; i++){
      board[point[0] + blocks[i][0]][point[1] + blocks[i][1]] = piece.color
  }

  // this.setState({
  //   rows: rows
  // })
  return board
}


export default TetrominoContainer
