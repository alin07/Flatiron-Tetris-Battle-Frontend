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
    const users = this.props.users.map((u,i) => <User hostId={this.props.hostId} areAllUsersReady={this.areAllUsersReady} key={i} user={u}/>)

    return (
      <List divided verticalAlign='middle'>
        {users}
      </List>

    )
  }
}

export default UserContainer
