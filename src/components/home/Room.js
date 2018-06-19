import React, { Component } from 'react'
import { List, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import joinRoom from '../../actions/joinRoom'
import leaveRoom from '../../actions/leaveRoom'
import disbandRoom from '../../actions/disbandRoom'
import getAllUsers from '../../actions/getAllUsers'


class Room extends Component {
  onJoinRoom = (e) => {
    this.props.joinRoom(localStorage.userId, e.target.id)
    this.props.history.push('/r/'+e.target.id)
  }
  render() {
    return (
        <List.Item>
          <List.Content floated='right'>
            { this.props.room.users.length < 2
              ? <Button id={this.props.room._id} onClick={this.onJoinRoom.bind(this)}>
                  { this.props.room.users.indexOf(localStorage.userId) >= 0 ? "Re-Enter Room" : "Join Room" }
                  </Button>
              : <Button onClick={() => this.props.history.push('/g/'+this.props.room._id)}>Spectate</Button>
            }
            { this.props.room.host === localStorage.userId
              ? <Button onClick={() => this.props.disbandRoom(this.props.room._id)}>Disband Room</Button>
              : this.props.room.users.indexOf(localStorage.userId) >= 0
                ? <Button onClick={() => this.props.leaveRoom(this.props.room._id, localStorage.userId)}>Leave Room</Button>
                : null
            }
          </List.Content>
          <List.Content>
            <List.Header>{this.props.room.name}</List.Header>
            {this.props.room.users.length}/2 users
          </List.Content>
        </List.Item>
    )
  }
}


function mapStateToProps(state){
  return {
    rooms: state.rooms
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    joinRoom: (userId, roomId) => joinRoom(userId, roomId),
    leaveRoom: (roomId, userId) => leaveRoom(roomId, userId),
    disbandRoom: (roomId) => disbandRoom(roomId),
    getAllUsers: (id) => getAllUsers(id)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
