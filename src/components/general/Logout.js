import React from 'react'
import { Button } from 'semantic-ui-react'

const logout = (props) => {
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('token')
  props.history.push('/')
}

const Logout = (props) => {
  return (
    <Button onClick={e => logout(props)}>
       Logout
    </Button>
  )
}

export default Logout
