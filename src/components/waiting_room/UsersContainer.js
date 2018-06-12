import React, { Component } from 'react'

import { List } from 'semantic-ui-react'
import User from './User'

class UserContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      isReady: []
    }
  }

  componentDidMount(){
  }

  render() {
    const users = this.props.users.map((u,i) => <User onStartGame={this.props.onStartGame} roomId={this.props.roomId} toggleReady={this.toggleReady} hostId={this.props.hostId} socket ={this.props.socket} areAllUsersReady={this.areAllUsersReady} key={i} user={u}/>)

    return (
      <List divided verticalAlign='middle'>
        {users}
      </List>

    )
  }
}

export default UserContainer
