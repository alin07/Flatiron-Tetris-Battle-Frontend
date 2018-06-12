import React, { Component } from 'react'
import PlayerBoard from './PlayerBoard'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getAllUsers from '../../actions/getAllUsers'

class Game extends Component {
  constructor(props) {
    super(props)
    const currentUrl = this.props.history.location.pathname
    this.roomId = currentUrl.substring(currentUrl.indexOf('/', 2)+1)
  }

  componentDidMount() {
    if(!this.props.user) {
      this.props.getAllUsers(this.roomId)
    }
  }

  render(){
    const players = this.props.users.map(u => <PlayerBoard key={u._id} user={u}/>)
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
    getAllUsers: (id) => getAllUsers(id)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
