import React from "react";
import { Component } from "react";
import "./App.css";
import NavBar from "./components/public/NavBar";
import Footer from "./components/public/footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

export interface AppProps {
}

export interface AppState {

}

class App extends Component<any, any> {
  constructor(props:any) {
    super(props); 
    this.state = {
    };    
}
  updateToken = (newSessionToken: string) => {
    if(localStorage.getItem('sessionToken',)) {
      this.setState({sessionToken: newSessionToken})  
  }
  localStorage.setItem('sessionToken', newSessionToken)
  this.setState({sessionToken: newSessionToken})
}
updateRole = (newRole: string) => {
  if(localStorage.getItem('role',)) {
    this.setState({role: newRole})  
}
localStorage.setItem('role', newRole)
this.setState({role: newRole})
}



 

render(){
  return (
    <div className="App">
      <Router>
        <NavBar 
        updateToken={this.updateToken} 
        updateRole={this.updateRole} 
        sessionToken={this.props.sessionToken}
        role={this.props.role} />
      </Router>

      <Footer />
    </div>
  );
}};


export default App;
