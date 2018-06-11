import React, { Component } from 'react'
import { List, Image, Checkbox, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import toggleReady from '../../actions/toggleReady'


class User extends Component {

  constructor(props){
    super(props)
    this.state = {
      isReady: false
    }
  }

  toggleReady = (e) => {
    //TODO: websockets
    const currentIsReady = !this.state.isReady
    this.setState({
      isReady: currentIsReady
    })

    this.props.toggleReady(localStorage.userId, currentIsReady)

  }
  areAllUsersReady = () => {
    this.props.users.every(u => u.isReady)
  }

  render() {
    /*
    const controls = localStorage.username === this.props.user.username
      ? (<Button primary disabled={this.props.}>Start Game</Button>)
      : (Ready? <Checkbox toggle checked={this.state.isReady} onChange={this.toggleReady}/>)
    */
    const readyCheckBox = (
      <div>
        Ready?
        <Checkbox disabled={ localStorage.username !== this.props.user.username } toggle checked={ this.state.isReady } onChange={ this.toggleReady }/>
      </div>
    )
    return (
      <List.Item>
        <List.Content floated='right'>
        { this.props.hostId === this.props.user._id
          ? <Button disabled={ !this.areAllUsersReady || this.props.hostId !== localStorage.userId }>Start Game</Button>
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
    users: state.users
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleReady: (userId, toggle) => toggleReady(userId, toggle)
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
