import React from "react";
import { Component } from "react";
import NavBar from "./components/public/NavBar";
import Footer from "./components/public/footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";


export interface AppProps {
  sessionToken: string;
  role: string;
}

export interface AppState {
  sessionToken: string,
  role: string,
}

class App extends Component<any, any> {
  constructor(props:any) {
    super(props); 
    this.state = {
      sessionToken:"",
      role: "",
    };    
}

componentDidMount() {
    if(localStorage.getItem('sessionToken')) {
    let newSessionToken = localStorage.getItem('sessionToken')
    this.setState({sessionToken: newSessionToken})  
}
if(localStorage.getItem('role')) {
  let newRole = localStorage.getItem('role')
  this.setState({role: newRole})  
}
}

  updateToken = (newSessionToken: string) => {
    if(localStorage.getItem('sessionToken')) {
      this.setState({sessionToken: newSessionToken})  
  }
  localStorage.setItem('sessionToken', newSessionToken)
  this.setState({sessionToken: newSessionToken})
}
updateRole = (newRole: string) => {
  if(localStorage.getItem('role')) {
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
        sessionToken={this.state.sessionToken}
        role={this.state.role} />
      </Router>

      <Footer />
    </div>
  );
}};


export default App;
