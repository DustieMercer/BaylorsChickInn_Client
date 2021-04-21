import React from "react";
import "./App.css";
import NavBar from "./components/public/NavBar";
import Footer from "./components/public/footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FunctionComponent = () => {
 

  return (
    <div className="App">
      <Router>
        <NavBar />
      </Router>

      <Footer />
    </div>
  );
};

export default App;
