import React, { Component } from 'react'
import { List, Image, Checkbox } from 'semantic-ui-react'

class User extends Component {

  constructor(props){
    super(props)
    this.state = {
      isReady: false
    }
  }

  toggleReady = (e) => {
    console.log(e.target)
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
    return(
      <List.Item>
        <List.Content floated='right'>
        Ready? <Checkbox toggle checked={this.state.isReady} onChange={this.toggleReady}/>
        </List.Content>
        <List.Content>{this.props.user.name}</List.Content>
      </List.Item>
    )
  }
}


export default User
