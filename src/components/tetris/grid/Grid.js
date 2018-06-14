import React, { Component } from 'react'
import GridRow from './GridRow'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import setUpQueue from '../../../actions/setUpQueue'
import nextQueue from '../../../actions/nextQueue'
import updateRows from '../../../actions/updateRows'
import setUpRows from '../../../actions/setUpRows'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.user = this.props.users.find(u => u._id === localStorage.userId)
    this.hasReachedBottom = this.hasReachedBottom.bind(this)
    this.keyboardEvent = this.keyboardEvent.bind(this)
  }

  componentDidMount() {
      this.user = this.props.users.find(u => u._id === localStorage.userId)
      this.onGetNextPiece(this.user._id)
      this.updateBoard()
      this.user = this.props.users.find(u => u._id === localStorage.userId)
    }

    placePiece = (rows, point, color, update) => {
      this.user = this.props.users.find(u => u._id === localStorage.userId)
      let piece = this.user.currentPiece
      const coord = point ? point : this.user.referencePoint
      // this.onGetNextPiece(this.user._id)
      if(!piece || piece.length < 1){
        piece = this.props.users.find(u => u._id === localStorage.userId).next
      }
      if(coord[0] >= 0)
        rows[coord[0]][coord[1]] = color

      for(let i = 0; i < piece.length; i++){
        if(this.canPlacePiece(coord, piece, i)) {
          rows[coord[0] + piece[i][0]][coord[1] + piece[i][1]] = color
        }
      }
      if(update){
        const that = this
        this.props.socket.send(JSON.stringify({
          subscription: that.roomId,
          type: 'UPDATE_ROWS',
          user: this.user._id,
          payload: {
            rows: rows,
            referencePoint: coord
          }
        }))
      }
    return rows
  }

  canPlacePiece(coord, piece, i){
    return coord[0] + piece[i][0] > -1 && coord[1] + piece[i][1] >= 0 && coord[1] + piece[i][1] < 10
  }

  removePiece = (rows) => {
    return this.placePiece(rows, null, 0, false)
  }

  moveHorizontally = (rows, direction) => {
    rows = this.removePiece(rows)
    const point = this.user.referencePoint
    this.placePiece(rows, null, 0, false)
    this.setState({
      referencePoint: [point[0], point[1] + direction]
    })
    this.placePiece(rows, null, 2, true)
  }

 canMoveHorizontally = (direction) => {
   const piece = [...this.user.currentPiece, [0,0]]
   const rows = this.user.rows
   console.log(piece)
   for(let i = 0; i < piece.length; i++){
     if(!this.isIrrelevantPiece(piece[i], piece, direction) && this.hasCellDirectlyHorizontal(rows, piece[i], direction)){
       return false
     }
   }
   if(direction > 0){
     return !this.hasReachedRightWall()
   } else {
     return !this.hasReachedLeftWall()
   }
    return true
  }

  updateBoard = () => {
    const that = this
    setInterval(()=>{
      if(this.props.users.every(u => u.gameReady)) {
        this.user = this.props.users.find(u => u._id === localStorage.userId)
        that.moveDown()
      }
    }, 1000)
  }

  rotate = () => {
    const rows = this.user.rows
    const piece = this.user.currentPiece
    const rotated = piece.map((row) => this.state.rotationAngle > 1
      ? this.state.rotationAngle === 2
        ? [row[1] * -1, row[0]]
        : [row[1], row[0] * -1]
      : [row[1], row[0]])
    // TODO: check to see if rotating will pass wall boundaries

    this.removePiece(rows)
    this.setState({
      currentPiece: rotated,
      rotationAngle: this.state.rotationAngle + 1 % 4
    })
    this.placePiece(rows, null, 2, true)
  };

  addNewPiece = () => {
    const rows = this.user.rows
    console.log('reached bottom? switch pieces/get a new piece')
    // this.setState({
    //   currentPiece: this.onGetNextPiece(localStorage.userId),
    //   currentRow: 0,
    //   currentColumn: 5
    // })
    this.placePiece(rows, null, this.user.currentPiece.color, true)
    this.setState({
      rows: rows,
    })
  }

  isGameOver = () => {
    return false // this.user.referencePoint[0] < 1 && this.hasPieceDirectlyBelow() && this.user.rows[0][5] > 0
  }

  // setUpQueue = () => {
  //   const keys = Object.keys(this.terominoes);
  //   let queue = []
  //   const that = this
  //   keys.forEach(k => {
  //     let i = 0;
  //     for(i; i < 2; i++){
  //       queue.push(that.terominoes[k])
  //     }
  //   })
  //   queue = this.shuffleQueue(queue)
  //   console.log("shuffled queue: ", queue)
  //   that.setState({
  //     queueOfPieces: queue
  //   })
  //   return queue
  // }
  //
  // shuffleQueue = (queue) => {
  //   let ran = 0
  //   let temp = 0
  //   for(let i = 0; i < queue.length; i++){
  //     ran = Math.floor(Math.random() * (queue.length))
  //     temp = queue[i]
  //     queue[i] = queue[ran]
  //     queue[ran] = temp
  //   }
  //   return queue
  // }

  onGetNextPiece = () => {
    if(this.props.users.find(u => u._id === this.user._id).queue.length < 1){
      this.props.setUpQueue(this.props.tetrominoes, this.user._id)
    }
    this.props.socket.send(JSON.stringify({
      subscription: this.props.roomId,
      type:'NEXT_QUEUE',
      user: this.user._id,
      payload: {
        user: this.props.users.find(u => u._id === this.user._id)
      }
    }))
    // // this.setState({
    // //   props.queue: queue
    // // })
    // return next
  }
  // getNextPiece = () => {
  //   const next = this.prop.users.find(u => u._id === localStorage.userId).queue[0]
  // }

  // swapHoldingPiece = () => {
  //   const current = this.user.currentPiece
  //   this.setState({
  //     currentPiece: this.state.holdingPiece,
  //     holdingPiece: current,
  //   })
  // }
  //
  // hasNextRowEmpty = () => {
  //   const rows = this.user.rows
  //   let i = 0
  //   for(i; i < rows[this.state.currentRow+this.user.currentPiece.length].length; i++){
  //     if(rows[this.state.currentRow+this.user.currentPiece.length][i] > 0){
  //       return false
  //     }
  //   }
  //   return true
  // }

  hasReachedBottom = () => {
    // return this.state.currentRow + this.user.currentPiece.length >= this.user.rows.length
    const point = this.user.referencePoint
    const pieces = [...this.user.currentPiece, [0,0]]
    for(let i = 0; i < pieces.length; i++){
      if(this.getTetrominoGridValue(point, pieces[i])[0] >= this.user.rows.length - 1){
        return true
      }
    }
    return false
  }
  hasReachedLeftWall = () => {
    const point = this.user.referencePoint
    const pieces = [...this.user.currentPiece, [0,0]]
    for(let i = 0; i < pieces.length; i++){
      if(this.getTetrominoGridValue(point, pieces[i])[1] <= 0){
        return true
      }
    }
    return false
  }
  hasReachedRightWall = () => {
    const point = this.user.referencePoint
    const pieces = [...this.user.currentPiece, [0,0]]
    for(let i = 0; i < pieces.length; i++){
      if(this.getTetrominoGridValue(point, pieces[i])[1] >= this.user.rows[0].length - 1){
        return true
      }
    }
    return false
  }

  // converts a tetromino point to its actual coordinates on the grid
  getTetrominoGridValue = (point, piece) => {
    return [parseInt(point[0], 10) + parseInt(piece[0], 10), parseInt(point[1], 10) + parseInt(piece[1], 10)]
  }
  //
  // // sets tetromino points to a different coordinate/value
  // setTetrominoGridValue = (point, piece, i, value) => {
  //   //TODO: NOT SURE HOW TO DO THIS YET
  //   return point[piece[i][0]][piece[i][1]] = value
  // }

  hasPieceDirectlyBelow = () => {
    const rows = this.user.rows
    const temp = [...this.user.currentPiece, [0,0]]

    for(let i = 0; i < temp.length; i++){
      if(!this.isIrrelevantPiece(temp[i], temp, 0) && this.hasCellDirectlyBelow(this.user.rows, this.getTetrominoGridValue(this.user.referencePoint, temp[i]))){
        return true
      }
    }
    return false
  }

  // checks to see if the block has one of it's own below it
  isIrrelevantPiece = (piece, tetromino, direction) => {
    for(let i = 0; i < tetromino.length; i++){
      if(direction === 0 && tetromino[i] !== piece && tetromino[i][1] === piece[1] && tetromino[i][0] - 1  === piece[0]) {
          return true
      } else if(direction === -1 && tetromino[i] !== piece && tetromino[i][1] === piece[1] + direction && tetromino[i][0] === piece[0]){ //check left
          return true
      } else if(direction === 1 && tetromino[i] !== piece && tetromino[i][1] === piece[1] + direction && tetromino[i][0]  === piece[0]) { //check right
        return true
      }
    }
    return false
  }

  hasCellDirectlyBelow = (rows, point) => {
    if(this.user.rows && this.user.rows.length > 0)
      return (point[0] < 0 || point[1] < 0 || point[0] > 19 || point[1] > 9) ? false :  rows[point[0] + 1][point[1]] > 0
    else {
      return false
    }
  }

  hasCellDirectlyHorizontal = (rows, point, direction) => {
    return (point[0] < 0 || point[1] < 0 || point[0] > 19 || point[1] > 9) ? false : rows[point[0]][point[1] + direction] > 0
  }

  // deleteRow = (arr, row) => {
  //    arr = arr.slice(0)
  //    arr.splice(row, 1)
  //    return arr
  // }

  moveDown = () => {

    // if(this.props.playGame){ // check if the game is paused/started or not
      if(!this.isGameOver() && !this.hasReachedBottom() && !this.hasPieceDirectlyBelow()){
        const point = this.user.referencePoint
        let rows = this.removePiece(this.user.rows)
        let newPoint = [point[0] + 1, point[1]]
        rows = this.placePiece(rows, newPoint, 2, true)


      } else if(this.isGameOver()) {
        console.log('game over!')
      } else {
        // TODO: check to see if row is completed
        this.resetTetrominoState()
      }
    }
  // }

  isRowCompleted = () => {

  }

  // sets a new piece as current piece and set the ref. point back to top
  resetTetrominoState = () => {
    // this.setState({
    //   referencePoint: [0,5],
    //   currentPiece: this.onGetNextPiece(this.user._id),
    //   rotationAngle: 3
    // })
    this.props.socket.send(JSON.stringify({
      subscription: this.roomId,
      type: 'RESET_TETRO',
      user: this.user._id,
      payload: {
        referencePoint: [-1,5],
        rotationAngle: 2
      }
    }))
    console.log('RESET TETRO STATE')
  }

  keyboardEvent = () => {
    this.user = this.props.users.find(u => u._id === this.user._id)
    const that = this
    return document.addEventListener('keydown', (e) => {

      console.log(e.key)
      if(this.props.user._id === this.user._id){
        if(that.props.users.every(u => u.gameReady)){
          if (e.key === "ArrowLeft") {
            if(that.canMoveHorizontally(-1)) {
              let point = that.state.referencePoint
              that.removePiece(that.state.rows)
              // that.setState({
              //   referencePoint: ,
              //   currentColumn: that.state.currentColumn - 1,
              // })
              that.placePiece(that.state.rows, [point[0], point[1] - 1], this.user.currentPiece.color, true)
            }
          } else if(e.key === "ArrowRight") {
            if(that.canMoveHorizontally(1)) {
              let point = that.state.referencePoint
              that.removePiece(that.state.rows)
              that.setState({
                referencePoint: [point[0], point[1] + 1],
              })
              that.placePiece(that.state.rows, 2, true)
            }
          } else if(e.key === "ArrowUp") {
            that.rotate()

          } else if(e.key === "ArrowDown"){
            console.log('move down')
            that.moveDown()
          } else if(e.key === " "){ // HARD DROP
            const row = that.getBottomMostRow()
            const rows = that.state.rows
            that.removePiece(rows)
            that.setState({
              referencePoint: [row, that.state.referencePoint[1]]
            })
            that.placePiece(rows, 2, true)
          }
        }
      }
    })
  }

  getBottomMostRow = () => {
    const rows = this.user.rows
    const piece = this.user.currentPiece
    const point = this.user.referencePoint
    let result = 20
    let counter = rows.length - 1
    let currentColumn
    let offset = 0

    for(let i = 0; i < piece.length; i++){
      currentColumn = point[1] + piece[i][1]
      counter = rows.length - 1
      while(rows[counter][currentColumn] > 0){
        counter --;
      }
      if(result >= counter) {
        if(offset < piece[i][0]){
          offset = piece[i][0]
        }
        result = counter
      }

    }
    return result - offset
  }

  render() {
    const rows = this.user.rows.map((r, i) => <GridRow key={i} id={i} row={this.user.rows[i]} />)
    return(
      <div className="grid-container">
        {rows}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    users: state.users.users
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setUpQueue: (tetrominoes, userId) => setUpQueue(tetrominoes, userId),
    nextQueue: (userId) => nextQueue(userId),
    setUpRows: (userId) => setUpRows(userId),
    updateRows: (rows, ref, userId) => updateRows(rows, ref, userId)

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)
