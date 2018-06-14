import React, { Component } from 'react'
import PlayerBoard from './PlayerBoard'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getAllUsers from '../../actions/getAllUsers'
import setUpQueue from '../../actions/setUpQueue'
import setUpRows from '../../actions/setUpRows'
import updateRows from '../../actions/updateRows'
import nextQueue from '../../actions/nextQueue'
import updateConnection from '../../actions/updateConnection'
import resetTetro from '../../actions/resetTetro'

class Game extends Component {
  constructor(props) {
    super(props)
    const currentUrl = this.props.history.location.pathname
    this.socket = new WebSocket("ws://localhost:3000")
    this.roomId = currentUrl.substring(currentUrl.indexOf('/', 2)+1)

    this.state = {
      tetrominoes: {
        o: { blocks: [[-1, 0],[0,-1],[-1,-1]], color:1 },
        i: { blocks: [[-2,0],[-1,0],[1,0]], color:2 },
        z: { blocks: [[0,-1],[1,0],[1,1]], color:3 },
        s: { blocks: [[0,1],[1,0],[1,-1]], color:4 },
        l: { blocks: [[-1,0],[1,0],[1,1]], color:5 },
        j: { blocks: [[0,-1],[-1,0],[-2,0]], color:6 },
        t: { blocks: [[-1,0],[0,-1],[0,1]], color:7 }
      },
      canPlay: false
    }
    this.handleSocketInput = this.handleSocketInput.bind(this)
  }

  componentDidMount() {

    this.socket.onmessage = function (event) {
      console.log(event.data);
      const data = JSON.parse(event.data);
      that.handleSocketInput(data)
    }

    if(!this.props.user) {
      this.props.getAllUsers(this.roomId)
    }

    const that = this
    this.socket.onopen = (e) => {
    //   that.socket.send(JSON.stringify({
    //     subscription: that.roomId,
    //     type: 'UPDATE_CONNECTION',
    //     user: localStorage.userId,
    //     payload: {
    //       _id: localStorage.userId,
    //     }
    //   }))
    // }

    this.socket.send(JSON.stringify({
      subscription: this.roomId,
      type: 'SETUP_ROWS',
      user: localStorage.userId,
      payload: {
        _id: localStorage.userId,
      }
    }))
    this.socket.send(JSON.stringify({
      subscription: this.roomId,
      type: 'SETUP_QUEUE',
      user: localStorage.userId,
      payload: {
        _id: localStorage.userId,
        tetrominoes: this.state.tetrominoes
      }
    }))
  }
}

  handleSocketInput = (data) => {
    console.log('DATA',data)
    switch(data.type) {
      // case 'UPDATE_CONNECTION':
      //   this.props.updateConnection(data.user)
      //   if(this.props.users.every(u => u.gameReady)){
      //     console.log('everyone can play! letting everyone know.')
      //     debugger
      //     this.socket.send(JSON.stringify({
      //       subscription: data.subscription,
      //       type: 'PLAY',
      //       user: data.user
      //     }))
      //   }
      //   break;
      case 'SETUP_QUEUE':
        this.props.setUpQueue(this.state.tetrominoes, data.user)
        break;
      case 'SETUP_ROWS':
        this.props.setUpRows(data.user)
        break;
      case 'NEXT_QUEUE':
        this.props.nextQueue(data.user)
        break;
      case 'UPDATE_ROWS':
        this.props.updateRows(data.payload.rows, data.payload.referencePoint, data.user)
        break;
      case 'RESET_TETRO':
        this.props.resetTetro(data.payload.referencePoint, data.payload.rotationAngle, data.user)
      case 'PLAY':
        this.setState({
          canPlay: true
        })
        debugger
        break;
      default:
        console.log(data.type, " is not supported")
    }
  }

  onReady

  render(){
    const players = this.props.users.map(u => <PlayerBoard playGame={this.state.canPlay} roomId={this.roomId} tetrominoes={this.state.tetrominoes} socket={this.socket} key={u._id} user={u}/>)
    return(
      <div id="game-wrapper">
         {players}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.users.users,
    rooms: state.rooms
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getAllUsers: (id) => getAllUsers(id),
    setUpQueue: (tetrominoes, userId) => setUpQueue(tetrominoes, userId),
    setUpRows: (userId) => setUpRows(userId),
    nextQueue: (userId) => nextQueue(userId),
    updateRows: (rows, ref, userId) => updateRows(rows, ref, userId),
    updateConnection: (userId) => updateConnection(userId),
    resetTetro: (refpoint, rotation, userId) => resetTetro(refpoint, rotation, userId)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
