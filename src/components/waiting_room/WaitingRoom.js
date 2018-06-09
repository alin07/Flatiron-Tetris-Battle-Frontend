import React, { Component } from 'react'

import UsersContainer from './UsersContainer'

class WaitingRoom extends Component {

  constructor(props){
    super(props)
    const currentUrl = this.props.history.location.pathname
    this.room = currentUrl.substring(currentUrl.indexOf('/', 1))
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="container">
        <UsersContainer room={this.room}/>
      </div>
    )
  }
}

export default WaitingRoom
