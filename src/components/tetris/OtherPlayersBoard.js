import React from 'react'
import GridRow from './grid/GridRow'
import TetrominoContainer from './TetrominoContainer'

const OtherPlayersBoard = (props) => {
  let rows
  if(props.user.rows.constructor === Array){
    rows = props.user.rows.map((r, i) => <GridRow key={i} id={i} row={r} /> )
  }

  return(
    <div className="inline">
      <h1>{props.user.username}</h1>
      {rows}
      <div className="inline">
        <h1>Next</h1>
        <TetrominoContainer rows={props.next} />
        <h1>Hold</h1>
        <TetrominoContainer rows={props.hold} />
      </div>

    </div>
  )
}

export default OtherPlayersBoard
