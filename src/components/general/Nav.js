import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Nav extends Component {

  constructor(props){
    super(props)
    this.state  = { activeItem: 'home' }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    const userStatus = localStorage.userId ? "logout" : "login"
    return (
      <div>
        <Menu >
          <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
            Home
          </Menu.Item>

          { /*
            <Menu.Item
              name='messages'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='friends'
              active={activeItem === 'friends'}
              onClick={this.handleItemClick}
            />
          */ }

          <Menu.Menu position='right'>
            <Menu.Item
              name={userStatus}
              active={activeItem === {userStatus}}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      <Segment>
        <p>asdf</p>
      </Segment>
    </div>
  )
  }
}

export default Nav
