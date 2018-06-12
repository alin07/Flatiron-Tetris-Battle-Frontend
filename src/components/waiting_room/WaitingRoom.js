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
    debugger
    fetch('http://localhost:3000/api/v1/rooms/'+this.roomId)
      .then(r => r.json())
      .then(r => {
        this.setState({
          room: r
        })
        return r
      }
    ).then(
      r => {
        this.props.getAllUsers(this.roomId, r.host)
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
        this.props.getAllUsers(data.subscription, this.state.room.host)
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
      case 'START':
        this.startGame()
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
    // let home page know
    this.userSocket.send(JSON.stringify({
      subscription: 'room',
      type:'LEAVE',
      user: localStorage.userId,
      payload: {
        roomId: this.roomId,
        userId: localStorage.userId
      }
    }))
  }
  componentWillUnmount() {
    this.userSocket.close()
  }

  toggleReady = (user, toggle) => {
    this.props.toggleReady(user, toggle)
  }

  startGame = () => {
    this.props.history.push('/g/'+this.roomId)
  }

  onStartGame = () => {
    console.log('start gaem!')
    this.userSocket.send(JSON.stringify({
      subscription: this.roomId,
      type:'START',
      user: localStorage.userId,
      payload: {
        roomId: this.roomId,
        users: this.props.users
      }
    }))
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
        <UsersContainer hostId={this.state.room.host} onStartGame={this.onStartGame} toggleReady={this.toggleReady} socket={this.userSocket} users={this.props.users.users} roomId={this.roomId} />
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
    getAllUsers: (id, hostId) => getAllUsers(id, hostId),
    toggleReady: (userId, toggle) => toggleReady(userId, toggle)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
