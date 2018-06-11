import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getAllRooms from '../../actions/getAllRooms'

import { Button, List } from 'semantic-ui-react'
import Room from './Room'

class RoomsContainer extends Component {

  componentDidMount() {
    this.props.getAllRooms()
  }

  render() {
    const rooms = this.props.rooms.map((r) => <Room key={r._id} {...this.props} room={r}/>)
    return (
      <div>
        <List divided verticalAlign='middle'>
          {rooms}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    rooms: state.rooms.rooms
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllRooms
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer)
