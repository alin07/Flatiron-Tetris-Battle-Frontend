import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import disbandRoom from '../../actions/disbandRoom'
import leaveRoom from '../../actions/leaveRoom'
import getAllUsers from '../../actions/getAllUsers'
import getRoom from '../../actions/getRoom'
import toggleReady from '../../actions/toggleReady'

import UsersContainer from './UsersContainer'
import { Button, Header } from 'semantic-ui-react'

class WaitingRoom extends Component {

  constructor(props){
    super(props)
    const currentUrl = this.props.history.location.pathname
    this.roomId = currentUrl.substring(currentUrl.indexOf('/', 2)+1)
    this.userSocket = new WebSocket("ws://localhost:3000")
    this.state = {
      room: {},
    }
    this.handleSocketInput = this.handleSocketInput.bind(this)
  }

  componentDidMount() {
    console.log('room id: '+this.roomId)
    // this.props.getRoom(this.roomId)
    fetch('http://localhost:3000/api/v1/rooms/'+this.roomId)
      .then(r => r.json())
      .then(r => {
        this.setState({
          room: r
        })
      }
    )

    const that = this
    this.userSocket.onopen = (e) => this.userSocket.send(JSON.stringify({
      subscription: this.roomId,
      type: 'CONNECTION',
      user: localStorage.userId,
      payload: {
        _id: localStorage.userId,
        username: localStorage.username,
        isReady: false
      }
    }))

    this.userSocket.onClose = () => {
      this.userSocket.send(JSON.stringify({
        subscription: this.roomId,
        type: 'DISCONNECTION',
        user: localStorage.userId,
        payload: {
          _id: localStorage.userId
        }
      }))
    }

    this.userSocket.onmessage = function (event) {
      console.log(event.data);
      const data = JSON.parse(event.data);
      that.handleSocketInput(data)
    }

    this.props.getAllUsers(this.roomId)
  }

  componentWillUnmount() {
    this.userSocket.send(JSON.stringify({
      subscription: this.roomId,
      type:'DISCONNECT',
      user: localStorage.userId,
      payload: {
        roomId: this.roomId
      }
    }))
  }

  handleSocketInput = (data) => {
    switch(data.type) {
      case 'CONNECTION':
        console.log('connected')
        this.props.getAllUsers(data.subscription)
        break
      case 'DISBAND':
        if(data.user === localStorage.userId)
          this.disbandRoom(data.payload)
        else
          this.leaveRoom(data.payload.roomId, localStorage.userId)
          break
      case 'LEAVE':
        this.leaveRoom(data.payload.roomId, data.payload.userId)
        break
      case 'TOGGLE_READY':
        console.log('doop doop')
        this.toggleReady(data.payload.userId, data.payload.toggle)
        break
      default:
        console.log(data, " is not supported")
    }
  }

  disbandRoom = (userId) => {
    this.props.disbandRoom(this.roomId)
    console.log('alert everyone this room is disbanding')
    this.props.history.push('/')
  }

  onDisbandRoom = () => {
    this.userSocket.send(JSON.stringify({
      subscription: this.roomId,
      type:'DISBAND',
      user: localStorage.userId,
      payload: {
        roomId: this.roomId
      }
    }))
  }

  onLeaveRoom = (e) => {
    this.userSocket.send(JSON.stringify({
      subscription: this.roomId,
      type:'LEAVE',
      user: localStorage.userId,
      payload: {
        roomId: this.roomId,
        userId: localStorage.userId
      }
    }))
  }

  leaveRoom = (roomId, userId) => {
    this.props.leaveRoom(roomId, userId)

    if(userId === localStorage.userId){
      this.props.history.push('/')
    }
    else{
      this.props.getAllUsers(roomId)
    }
  }

  toggleReady = (user, toggle) => {
    this.props.toggleReady(user, toggle)
  }

  render() {
    return (
      <div id="container">
        <Header as='h1'>{this.state.room.name}</Header>
        {
          localStorage.userId === this.state.room.host
          ? <Button onClick={this.onDisbandRoom}>Disband Room</Button>
          : <Button onClick={this.onLeaveRoom}>Leave Room</Button>
        }
        <UsersContainer {...this.props} hostId={this.state.room.host} toggleReady={this.toggleReady} socket={this.userSocket} users={this.props.users.users} roomId={this.roomId} />
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
    getAllUsers: (id) => getAllUsers(id),
    toggleReady: (userId, toggle) => toggleReady(userId, toggle)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
