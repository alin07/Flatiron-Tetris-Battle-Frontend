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
        <h1>{this.props.user.username}</h1>
        <Grid user={this.props.user} />
      </div>
    )
  }
}

export default PlayerBoard
