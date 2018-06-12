import React, { Component } from 'react'
import RoomsContainer from './RoomsContainer'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createRoom from '../../actions/createRoom'
import getAllRooms from '../../actions/getAllRooms'
import joinRoom from '../../actions/joinRoom'
import Logout from '../general/Logout'
import CreateRoomModal from './CreateRoomModal'

class Home extends Component {
  constructor(props){
    super(props)
    this.socket = new WebSocket("ws://localhost:3000")
  }

  componentDidMount() {
    const that = this
    this.socket.onmessage = function (event) {
      console.log(event.data);
      const data = JSON.parse(event.data);
      that.handleSocketInput(data)
    }
  }

  onCreateRoom = () => {

  }

  handleSocketInput = (data) => {
    switch(data.type) {
      case 'LEAVE':
        this.props.getAllRooms()
        break
      case 'CREATE':
        this.props.createRoom()
        break;
      case 'JOIN':
        this.props.joinRoom(data.userId, data.roomId)
        this.socket.close()
        break;
      default:
        console.log(data, " is not supported")
    }
  }

  componentWillUnmount() {
    this.socket.close()
  }


  render() {
    return (
      <div>
        {localStorage.userId ? <CreateRoomModal socket={this.socket} {...this.props}/> : null}
        {localStorage.userId ? <Logout {...this.props}/> : null}
        <RoomsContainer socket={this.socket} {...this.props} />
      </div>
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
    createRoom,
    joinRoom: (userId, roomId) => joinRoom(userId, roomId),
    getAllRooms
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
