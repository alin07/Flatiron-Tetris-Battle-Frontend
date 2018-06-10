import React, { Component } from 'react'
import { List, Image, Checkbox, Button } from 'semantic-ui-react'

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
  console.log(this.props.user)
    return(
      <List.Item>
        <List.Content floated='right'>
        { localStorage.userId === this.props.user._id
          ? <Button disabled={ this.props.areAllUsersReady }>Start Game</Button>
          : readyCheckBox
        }
        </List.Content>
        <List.Content>{ this.props.user.username }</List.Content>
      </List.Item>
    )
  }
}


export default User
