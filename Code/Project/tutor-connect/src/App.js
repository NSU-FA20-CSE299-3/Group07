import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c158dc',
      main: '#8e24aa',
      dark:'#5c007a',
      contrastText: '#fff'
    },
    secondary: {
      light: '#6746c3',
      main: '#6a1b9a',
      dark:'#000063',
      contrastText: '#fff'
    },
  },
})

class App extends Component {
  render() {
    return (
     <MuiThemeProvider theme={theme}>
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
     </MuiThemeProvider>
    );
  }
}

export default App;
