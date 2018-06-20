import React, { Component } from 'react'
import { List, Image, Checkbox, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toggleReady from '../../actions/toggleReady'
import setUpQueue from '../../actions/setUpQueue'


class User extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
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


  onStartGame = () => {
    console.log('on ')
    this.props.socket.send(JSON.stringify({
      subscription: this.props.roomId,
      type:'START_GAME',
      user: localStorage.userId,
      payload: {
        roomId: this.props.roomId
      }
    }))
  }

  render() {
    const ready = this.props.users.every(u => u.isReady || u._id === this.props.hostId ) && this.props.hostId === localStorage.userId
    const readyCheckBox = (
      <div>
        Ready?
        <Checkbox disabled={ localStorage.username !== this.props.user.username } toggle
          checked={ this.props.users.find(u => u._id === this.props.user._id).isReady } onChange={ this.onToggleReady.bind(this) }/>
      </div>
    )

    const isAllReady = this.props.users.every(u => u._id === this.props.hostId || u.isReady)
    console.log("is all ready ",isAllReady)
    console.log("disabled?: ", !isAllReady || this.props.hostId !== localStorage.userId )
    return (
      <List.Item>
        <List.Content floated='right'>
        {
          this.props.hostId === this.props.user._id
          ? <Button onClick={this.onStartGame.bind(this)} disabled={ !ready || this.props.users.length < 2 }>Start Game</Button>
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
