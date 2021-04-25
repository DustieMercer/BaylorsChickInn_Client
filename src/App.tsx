import React from "react";
import { Component } from "react";
import "./App.css";
import NavBar from "./components/public/NavBar";
import Footer from "./components/public/footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";




class App extends Component<any,any> {
  constructor(props:any) {
    super(props); 
    this.state = {
      sessionToken: ''};
}
  updateToken = (newToken: string) => {
    if(localStorage.getItem('token')) {
      this.setState({sessionToken: newToken})  
  }
  localStorage.setItem('token', newToken)
  this.setState({sessionToken: newToken})
}

render(){
  return (
    <div className="App">
      <Router>
        <NavBar updateToken={this.updateToken} />
      </Router>

      <Footer />
    </div>
  );
}};


export default App;
