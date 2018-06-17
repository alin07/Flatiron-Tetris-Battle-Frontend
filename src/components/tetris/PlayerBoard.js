import React, { Component } from 'react'
import Grid from './grid/Grid'

class PlayerBoard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render(){
    return(
      <div className="inline">
        <h1 className="player-self">{this.props.user.username}</h1>
        <Grid roomId={this.props.roomId} canPlay={this.props.canPlay} socket={this.props.socket} tetrominoes={this.props.tetrominoes} user={this.props.user} />
      </div>
    )
  }
}

export default PlayerBoard
