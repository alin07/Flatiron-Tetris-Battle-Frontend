import React, { Component } from 'react'
import RoomsContainer from './RoomsContainer'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import createRoom from '../../actions/createRoom'
import Logout from '../general/Logout'
import CreateRoomModal from './CreateRoomModal'

class Home extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        {localStorage.userId ? <CreateRoomModal /> : null}
        {localStorage.userId ? <Logout {...this.props}/> : null}
        <RoomsContainer {...this.props} />
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
    createRoom
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
