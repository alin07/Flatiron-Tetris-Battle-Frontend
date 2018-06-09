import React, { Component } from 'react'
import { List, Button } from 'semantic-ui-react'
class Room extends Component {
  onJoinRoom = (e) => {

    this.props.history.push('/room/'+e.target.id)
  }
  render() {
    console.log("room component: ", this.props.room)
    return (
      <div>
        <List.Item>
          <List.Content floated='right'>
            <Button id={this.props.room._id} onClick={this.onJoinRoom.bind(this)}>Join Room</Button>
            {this.props.room.host._id === localStorage.userId ? <Button>Disband Room</Button> : null}
          </List.Content>
          <List.Content>
            <List.Header>{this.props.room.name}</List.Header>
            {this.props.room.users.length}/4 users
          </List.Content>
        </List.Item>
      </div>
    )
  }
}

export default Room
