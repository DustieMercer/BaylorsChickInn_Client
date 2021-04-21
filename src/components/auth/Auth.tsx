import { Component } from "react";
import Create from "./Create";
import Login from './Login';




class Auth extends Component {


  render() {
    return (
      <main>
        <Create />
        <Login />
      </main>
    );
  }
}
export default Auth;
