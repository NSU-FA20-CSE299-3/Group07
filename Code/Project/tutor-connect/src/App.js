import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
