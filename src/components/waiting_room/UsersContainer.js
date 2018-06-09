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
    fetch('http://localhost:3000/api/v1/users'+this.props.room)
      .then('')
  }

  render() {
    const users = [{username:'alice'}, {username:'caitlyn'}].map((u,i) => <User key={i} user={u}/>)

    return (
      <List divided verticalAlign='middle'>
        {users}
      </List>

    )
  }
}

export default UserContainer
