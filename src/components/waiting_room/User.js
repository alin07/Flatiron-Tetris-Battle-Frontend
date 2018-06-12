import React, { Component } from 'react'
import { List, Image, Checkbox, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toggleReady from '../../actions/toggleReady'


class User extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  toggleReady = (e) => {
    this.props.toggleReady.bind(this)()
  }

  onToggleReady = () => {
    console.log('on toggleReady')
    this.props.socket.send(JSON.stringify({
      subscription: this.props.roomId,
      type:'TOGGLE_READY',
      user: localStorage.userId,
      payload: {
        toggle: !this.props.users.find(u => u._id === localStorage.userId).isReady,
        userId: localStorage.userId
      }
    }))
  }

  // areAllUsersReady = () => {
  //   console.log(this.props.users)
  //   debugger
  //   this.props.users.every(u => u._id === this.props.hostId || u.isReady)
  // }

  render() {

    const readyCheckBox = (
      <div>
        Ready?
        <Checkbox disabled={ localStorage.username !== this.props.user.username } toggle
          checked={ this.props.users.find(u => u._id === this.props.user._id).isReady } onChange={ this.onToggleReady.bind(this) }/>
      </div>
    )
    //!isAllReady || this.props.hostId !== localStorage.userId
    const isAllReady = this.props.users.every(u => u._id === this.props.hostId || u.isReady)
    console.log("is all ready ",isAllReady)
    console.log("disabled?: ", !isAllReady || this.props.hostId !== localStorage.userId )
    return (
      <List.Item>
        <List.Content floated='right'>
        { this.props.hostId === this.props.user._id
          ? <Button onClick={this.props.onStartGame} disabled={ !isAllReady || this.props.hostId !== localStorage.userId }>Start Game</Button>
          : readyCheckBox
        }
        </List.Content>
        <List.Content>{ this.props.user.username }</List.Content>
      </List.Item>
    )
  }
}


function mapStateToProps(state){
  return {
    users: state.users.users
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleReady: (userId, toggle) => toggleReady(userId, toggle)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
