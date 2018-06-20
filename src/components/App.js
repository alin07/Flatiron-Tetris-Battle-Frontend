import React, { Component } from 'react';

import Home from './home/Home'
import WaitingRoom from './waiting_room/WaitingRoom'
import UserForm from './general/UserForm'
import Game from './tetris/Game'

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  render() {
    return(
      <div>
        <Router>
          <div>
            <Route exact path="/" component={ Home } { ...this.props } />
            <Route path="/r/:id" render={ (props) => <WaitingRoom {...props} />} />
            <Route path="/g/:id" render={ (props) => <Game {...props} /> } />
            <Route path="/login" render={ (props) => <UserForm {...props} task="Login" otherTask={"Register"}/> } />
            <Route path="/register" render={ (props) => <UserForm {...props} task="Register" otherTask={"Login"}/> } />
            <Route path="/g/:id" render={ (props) => <Game {...props} /> } />
          </div>
       </Router>
      </div>
    )
  }
}

export default App;
