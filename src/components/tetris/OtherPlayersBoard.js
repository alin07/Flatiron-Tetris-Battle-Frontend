import React from 'react'
import GridRow from './grid/GridRow'

const OtherPlayersBoard = (props) => {
  let rows
  if(props.user.rows.constructor === Array){
    rows = props.user.rows.map((r,i) => <GridRow key={i} id={i} row={props.user.rows[i]} /> )
  }
  return(
    <div className="inline">
      <h1>{props.user.username}</h1>
      {rows}
    </div>
  )
}

export default OtherPlayersBoard
