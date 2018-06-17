import React, { Component } from 'react'
import PlayerBoard from './PlayerBoard'
import OtherPlayersBoard from './OtherPlayersBoard'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getAllUsers from '../../actions/getAllUsers'
import setUpQueue from '../../actions/setUpQueue'
import setUpRows from '../../actions/setUpRows'
import updateRows from '../../actions/updateRows'
import nextQueue from '../../actions/nextQueue'
import updateConnection from '../../actions/updateConnection'
import resetTetro from '../../actions/resetTetro'
import getRoom from '../../actions/getRoom'
import setUsers from '../../actions/setUsers'
import setRows from '../../actions/setRows'

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
    this.room = null
    this.handleSocketInput = this.handleSocketInput.bind(this)
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/rooms/'+this.roomId)
      .then(r => r.json())
      .then(r => {
        this.room = r
      })

    this.socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      that.handleSocketInput(data)
    }

    if(!this.props.user) {
      this.props.getAllUsers(this.roomId)
    }

    const that = this
    this.socket.onopen = (callback) => {
      this.waitForConnection(() => {
        this.socket.send(JSON.stringify({
          subscription: this.roomId,
          type: 'UPDATE_CONNECTION',
          user: localStorage.userId,
          payload: {
            _id: localStorage.userId,
          }
        }))
      }, 1000)
    }
  }


  waitForConnection = (callback, interval) => {
    if(this.socket.readyState === 1) {
      callback()
    } else {
      const that = this
      setTimeout(() => {
        that.waitForConnection(callback, interval);
      }, interval)
    }
  }

  handleSocketInput = (data) => {
    switch(data.type) {
      case 'UPDATE_CONNECTION':
        this.setUpInit()
        break;
      case 'SETUP_QUEUE':
        this.props.setUpQueue(this.setUpQueue(), data.user)
        break;
      case 'SETUP_ROWS':
        this.props.setUpRows(data.user)
        break;
      case 'NEXT_QUEUE':
        if(!data.user.queue)
          this.props.setUpQueue(this.setUpQueue(), data.user)
        this.props.nextQueue(data.user)
        break;
      case 'UPDATE_ROWS':
        this.props.updateRows(data.payload.rows, data.payload.referencePoint, data.user)
        break;
      case 'RESET_TETRO':
        this.props.resetTetro(data.payload.referencePoint, data.payload.rotationAngle, data.user)
        break;
      case 'SEND_ROWS':
        this.props.setRows(data.payload, data.user)
        break;
      case 'PLAY':
        this.props.setUsers(data.payload.users, localStorage.userId)
        this.setState({
          canPlay: true
        })
        break;
      default:
        console.log(data.type, " is not supported")
    }
  }

  setUpInit = () => {
    if(this.room && localStorage.userId === this.room.host){
      // if you're the host, set everything up, and send it over
      this.user = this.props.users.find(u => u._id === localStorage.userId)

      this.props.users.forEach(u => {
        this.props.setUpRows(u._id)
        this.props.setUpQueue(this.setUpQueue(), u._id)
      })

      this.socket.send(JSON.stringify({
        subscription: this.roomId,
        type: 'PLAY',
        user: localStorage.userId,
        payload: {
          _id: localStorage.userId,
          users: this.props.users
        }
      }))

    } else if(!this.state.canPlay){
      // wait for everyone
      // while(!this.state.canPlay || this.room){
        window.setTimeout(() => {this.setUpInit();}, 1000);
      // }

    }
  }

  setUpQueue = () => {
    const keys = Object.keys(this.state.tetrominoes);
    let queue = []
    const that = this
    keys.forEach(k => {
      for(let i = 0; i < 2; i++){
        queue.push(this.state.tetrominoes[k].blocks)
      }
    })
    queue = this.shuffleQueue(queue)
    return queue
  }

  shuffleQueue = (queue) => {
    let ran = 0
    let temp = 0
    for(let i = 0; i < queue.length; i++){
      ran = Math.floor(Math.random() * (queue.length))
      temp = queue[i]
      queue[i] = queue[ran]
      queue[ran] = temp
    }
    return queue
  }

  render(){
    const you = this.props.users.find(u => u._id === localStorage.userId)
    const otherPlayers = this.props.users
      ? this.props.users.filter(u => u._id !== localStorage.userId).map((u, i) => <OtherPlayersBoard key={i} user={u} />)
      : null

    return(
      <div id="game-wrapper">
         { this.state.canPlay
           ? <PlayerBoard canPlay={this.state.canPlay} roomId={this.roomId} tetrominoes={this.state.tetrominoes} socket={this.socket} key={you._id} user={you} />
         : <h1>LOADING...</h1> }
         { this.state.canPlay ? otherPlayers : null}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    users: state.users.users,
    rooms: state.rooms.rooms
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getAllUsers: (id) => getAllUsers(id),
    getRoom: (id) => getRoom(id),
    setUpQueue: (tetrominoes, userId) => setUpQueue(tetrominoes, userId),
    setUpRows: (userId) => setUpRows(userId),
    nextQueue: (userId) => nextQueue(userId),
    updateRows: (rows, ref, userId) => updateRows(rows, ref, userId),
    updateConnection: (userId) => updateConnection(userId),
    resetTetro: (refpoint, rotation, userId) => resetTetro(refpoint, rotation, userId),
    setUsers: (users, id)=> setUsers(users, id),
    setRows: (rows, user) => setRows(rows, user)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
