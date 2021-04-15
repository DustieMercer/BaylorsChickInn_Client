import React, { Component } from 'react'
import Create from './Create';
import Login from "./Login";


class Auth extends Component {


  render() {
    return(
     <div>

      <Create />
      <Login />
      </div>
      )
  }
}

export default Auth