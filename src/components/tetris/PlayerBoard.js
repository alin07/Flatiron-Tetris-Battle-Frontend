import React, { Component } from 'react'
import Grid from './grid/Grid'
import TetrominoContainer from './TetrominoContainer'

class PlayerBoard extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div className="inline">
        <h1 className="player-self">{this.props.user.username}</h1>
        <Grid ref={ref => { this.child = ref }} roomId={this.props.roomId} canPlay={this.props.canPlay} socket={this.props.socket} tetrominoes={this.props.tetrominoes} user={this.props.user} />
        <div className="next-hold">
          <div className="next">
            <h1>Next</h1>
            <TetrominoContainer className="next" rows={this.props.nextRows} />
            </div>
          <div className="hold">
            <h1>Hold</h1>
            <TetrominoContainer className="hold" rows={this.props.holdRows} />
          </div>
        </div>

      </div>
    )
  }
}

export default PlayerBoard
