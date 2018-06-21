import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'

class UserFormContainer extends Component {

  userFormOnSubmit = (event) => {
    event.preventDefault()
    const inputs = event.target.querySelectorAll('input')
    fetch('https://flatiron-tetris-battle-backend.herokuapp.com/'+this.props.task.toLowerCase(), {
      method:'POST',
      headers: { //
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: inputs[0].value, password: inputs[1].value})
    }).then(r => r.json()).then(r => {
      console.log(r)
      localStorage.setItem('userId', r._id);
      localStorage.setItem('username', r.username);
      // TODO: send websockets
      this.props.history.push('/')
    })


  }

  render() {
    return(
      <div className="container">
        <h1>{this.props.task}</h1>
        <Form onSubmit={this.userFormOnSubmit}>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder='Password' />
          </Form.Field>
          <Button type='submit'>{this.props.task}</Button>
        </Form>
        {/* onClick={this.props.history.push('/'+this.props.otherTask.toLowerCase())} */}
        <Button >{this.props.otherTask}</Button>
      </div>
    )
  }
}


export default UserFormContainer
