import React from 'react';
import './App.css';
import { Route, Switch } from "react-router-dom";
import Auth from './components/auth/Auth';
import Header from './components/public/Header';
import Footer from './components/public/Footer';
import NavBar from './components/public/NavBar';
import ChickDisplay from './components/public/ChickDisplay';
import Home from './components/public/Home';
import ChickGear from './components/public/ChickGear';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="vericaltCenter">
      <Auth />
      <Header />
      <Footer />
      <NavBar />
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/meetthechicks" component={ChickDisplay} />
      <Route exact path="/chickgear" component={ChickGear} />
      </Switch>
      </div>
    </div>
  );
}

export default App;
