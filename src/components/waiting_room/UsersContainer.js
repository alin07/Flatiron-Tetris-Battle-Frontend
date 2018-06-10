import React, { Component } from 'react'

import { List } from 'semantic-ui-react'
import User from './User'

class UserContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      isReady: [],
      areAllUsersReady: false
    }
  }

  componentDidMount(){
    // fetch('http://localhost:3000/api/v1/users/'+this.props.roomId)
    //   .then(r => r.json())
    //   .then(r => {
    //     this.setState({
    //       users: r
    //     })
    //   })
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
