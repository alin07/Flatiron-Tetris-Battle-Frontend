import React, { Component } from 'react'
import GridRow from './GridRow'

class Grid extends Component {
  constructor(props) {
    super(props)
    this.terominoes = {
      o: [[-1, 0],[0,-1],[-1,-1]],
      i: [[-2,0],[-1,0],[1,0]],
      z: [[0,-1],[1,0],[1,1]],
      s: [[0,1],[1,0],[1,-1]],
      l: [[-1,0],[1,0],[1,1]],
      j: [[0,-1],[-1,0],[-2,0]],
      t: [[-1,0],[0,-1],[0,1]]
    }

    this.state = {
      rows: new Array(20),
      currentPiece: [],
      referencePoint: [0,5],
      holdPiece:[],
      queueOfPieces: [],
      rotationAngle: 3
    }
    this.hasReachedBottom = this.hasReachedBottom.bind(this)
    this.keyboardEvent = this.keyboardEvent.bind(this)
  }

  componentDidMount() {
      this.setUpQueue()
      this.setState({
        currentPiece: this.getNextPiece()
      })
      const result = this.setUpGrid()
      this.updateBoard()
      this.event = this.keyboardEvent()
    }

    placePiece = (rows, color) => {
    let piece = this.state.currentPiece
    const coord = this.state.referencePoint
    if(!piece || piece.length < 1){
      piece = this.getNextPiece()
    }
    rows[coord[0]][coord[1]] = color
    for(let i = 0; i < piece.length; i++){
      if(this.canPlacePiece(coord, piece, i)) {
        rows[coord[0] + piece[i][0]][coord[1] + piece[i][1]] = color
      }
    }
    this.setState({
      rows: rows
    })
    return rows
  }

  canPlacePiece(coord, piece, i){
    return coord[0] + piece[i][0] > -1 && coord[1] + piece[i][1] >= 0 && coord[1] + piece[i][1] < 10
  }

  removePiece = (rows) => {
    return this.placePiece(rows, 0)
  }

  moveHorizontally = (rows, direction) => {
    rows = this.removePiece(rows)
    const point = this.state.referencePoint
    this.placePiece(rows, 0)
    this.setState({
      referencePoint: [point[0], point[1] + direction]
    })
    this.placePiece(rows, 2)
  }

 canMoveHorizontally = (direction) => {
   const piece = [...this.state.currentPiece, [0,0]]
   const rows = this.state.rows
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
      // if(this.props.playGame)
        that.moveDown()
    }, 1000)
  }

  setUpGrid = () => {
    let result = this.state.rows
    let i = 0
    let j = 0
    for (i = 0; i < result.length; i++) {
      result[i] =  new Array(10)
      for(j = 0; j < result[i].length; j++){
        result[i][j] = 0
      }
    }
    return result;
  }

  rotate = () => {
    const rows = this.state.rows
    const piece = this.state.currentPiece
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
    this.placePiece(rows, 2)
  };

  addNewPiece = () => {
    const rows = this.state.rows
    console.log('reached bottom? switch pieces/get a new piece')
    this.setState({
      currentPiece: this.getNextPiece(),
      currentRow: 0,
      currentColumn: 5
    })
    this.placePiece(rows)
    this.setState({
      rows: rows,
    })
  }

  isGameOver = () => {
    return this.state.referencePoint[0] < 1 && this.hasPieceDirectlyBelow() && this.state.rows[0][5] > 0
  }

  setUpQueue = () => {
    const keys = Object.keys(this.terominoes);
    let queue = []
    const that = this
    keys.forEach(k => {
      let i = 0;
      for(i; i < 2; i++){
        queue.push(that.terominoes[k])
      }
    })
    queue = this.shuffleQueue(queue)
    console.log("shuffled queue: ", queue)
    that.setState({
      queueOfPieces: queue
    })
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

  getNextPiece = () => {
    let queue = this.state.queueOfPieces
    if(queue.length < 1){
      queue = this.setUpQueue()
    }
    const next = queue.shift()
    this.setState({
      queueOfPieces: queue
    })
    return next
  }

  // swapHoldingPiece = () => {
  //   const current = this.state.currentPiece
  //   this.setState({
  //     currentPiece: this.state.holdingPiece,
  //     holdingPiece: current,
  //   })
  // }
  //
  // hasNextRowEmpty = () => {
  //   const rows = this.state.rows
  //   let i = 0
  //   for(i; i < rows[this.state.currentRow+this.state.currentPiece.length].length; i++){
  //     if(rows[this.state.currentRow+this.state.currentPiece.length][i] > 0){
  //       return false
  //     }
  //   }
  //   return true
  // }

  hasReachedBottom = () => {
    // return this.state.currentRow + this.state.currentPiece.length >= this.state.rows.length
    const point = this.state.referencePoint
    const pieces = [...this.state.currentPiece, [0,0]]
    for(let i = 0; i < pieces.length; i++){
      if(this.getTetrominoGridValue(point, pieces[i])[0] >= this.state.rows.length - 1){
        return true
      }
    }
    return false
  }
  hasReachedLeftWall = () => {
    const point = this.state.referencePoint
    const pieces = [...this.state.currentPiece, [0,0]]
    for(let i = 0; i < pieces.length; i++){
      if(this.getTetrominoGridValue(point, pieces[i])[1] <= 0){
        return true
      }
    }
    return false
  }
  hasReachedRightWall = () => {
    const point = this.state.referencePoint
    const pieces = [...this.state.currentPiece, [0,0]]
    for(let i = 0; i < pieces.length; i++){
      if(this.getTetrominoGridValue(point, pieces[i])[1] >= this.state.rows[0].length - 1){
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
    const rows = this.state.rows
    const temp = [...this.state.currentPiece, [0,0]]

    for(let i = 0; i < temp.length; i++){
      if(!this.isIrrelevantPiece(temp[i], temp, 0) && this.hasCellDirectlyBelow(rows, this.getTetrominoGridValue(this.state.referencePoint, temp[i]))){
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
    return (point[0] < 0 || point[1] < 0 || point[0] > 19 || point[1] > 9) ? false :  rows[point[0] + 1][point[1]] > 0
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
        const point = this.state.referencePoint
        let rows = this.removePiece(this.state.rows)
        this.setState({
          referencePoint: [point[0] + 1, point[1]]
        })
        this.placePiece(rows, 2)
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
    this.setState({
      referencePoint: [0,5],
      currentPiece: this.getNextPiece(),
      rotationAngle: 3
    })
  }

  keyboardEvent = () => {
    const that = this
    return document.addEventListener('keydown', (e) => {

      console.log(e.key)
      if(this.props.user._id === localStorage.userId){
      // if(that.props.playGame){
        if (e.key === "ArrowLeft") {
          if(that.canMoveHorizontally(-1)) {
            let point = that.state.referencePoint
            that.removePiece(that.state.rows)
            that.setState({
              referencePoint: [point[0], point[1] - 1],
              currentColumn: that.state.currentColumn - 1,
            })
            that.placePiece(that.state.rows, 2)
          }
        } else if(e.key === "ArrowRight") {
          if(that.canMoveHorizontally(1)) {
            let point = that.state.referencePoint
            that.removePiece(that.state.rows)
            that.setState({
              referencePoint: [point[0], point[1] + 1],
            })
            that.placePiece(that.state.rows, 2)
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
          that.placePiece(rows, 2)
        }
      }
      // }
    })
  }

  getBottomMostRow = () => {
    const rows = this.state.rows
    const piece = this.state.currentPiece
    const point = this.state.referencePoint
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
    const rows = this.state.rows.map((r, i) => <GridRow key={i} id={i} row={this.state.rows[i]} />)
    return(
      <div className="grid-container">
        {rows}
      </div>
    )
  }
}

export default Grid
