import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import firebaseApp from './firebase';

//Components
import Navbar from './components/Navbar';

//Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7953d2',
      main: '#4527a0',
      dark:'#000070',
      contrastText: '#fff'
    },
    secondary: {
      light: '#534bae',
      main: '#1a237e',
      dark:'#000051',
      contrastText: '#fff'
    },
  },
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: {}
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      }
      else {
        this.setState({user: null})
      }
    });

    console.log(this.state.user);
  }

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
