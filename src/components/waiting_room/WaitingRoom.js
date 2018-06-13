import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import disbandRoom from '../../actions/disbandRoom'
import leaveRoom from '../../actions/leaveRoom'
import getAllUsers from '../../actions/getAllUsers'
import getRoom from '../../actions/getRoom'

import UsersContainer from './UsersContainer'
import { Button, Header } from 'semantic-ui-react'

class WaitingRoom extends Component {

  constructor(props){
    super(props)
    const currentUrl = this.props.history.location.pathname
    this.roomId = currentUrl.substring(currentUrl.indexOf('/', 2)+1)
    this.state = {
      room: {}
    }
  }

  componentDidMount() {
    // this.props.getRoom(this.roomId)
    fetch('http://localhost:3000/api/v1/rooms/'+this.roomId)
      .then(r => r.json())
      .then(r => {
        this.setState({
          room: r
        })
      }
    )

    this.props.getAllUsers(this.roomId)
  }

  onDisbandRoom = (e) => {
    this.props.disbandRoom(this.roomId)
    this.props.history.push('/')
  }

  onLeaveRoom = (e) => {
    this.props.leaveRoom(this.roomId, localStorage.userId)
    this.props.history.push('/')
  }

  render() {
    console.log('rumu:', this.state.room)
    return (
      <div id="container">
        <Header as='h1'>{this.state.room.name}</Header>
        {
          localStorage.userId === this.state.room.host
          ? <Button onClick={this.onDisbandRoom}>Disband Room</Button>
          : <Button onClick={this.onLeaveRoom}>Leave Room</Button>
        }
        <UsersContainer hostId={this.state.room.host} users={this.props.users.users} roomId={this.roomId}/>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    users: state.users,
    rooms: state.rooms
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    disbandRoom: (id) => disbandRoom(id),
    leaveRoom: (roomId, userId) => leaveRoom(roomId, userId),
    getRoom: (id) => getRoom(id),
    getAllUsers: (id) => getAllUsers(id)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
