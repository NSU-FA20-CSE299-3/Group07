import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
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
import User from './pages/user';
import EditProfile from './pages/editProfile';

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
      user: {},
      loggedIn: false
    }
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
        this.setState({loggedIn: true});
      }
      else {
        this.setState({user: null});
        this.setState({loggedIn: false});
      }
    });
  }


  render() {
    return (
     <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar currentUser={this.state.user}/>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" render={() => (this.state.loggedIn ? (<Redirect to="/" exact/>) : (<Login />))} />
              <Route path="/signup" render={() => (this.state.loggedIn ? (<Redirect to="/" exact/>) : (<Signup />))} />
              <Route path="/user/:userID" component={User}/>
              <Route path="/edit-profile" render={() => (this.state.loggedIn ? (<EditProfile currentUserID={this.state.user.uid} />) : (<Redirect to="/" exact/>))} />
            </Switch>
          </div>
        </Router>
      </div>
     </MuiThemeProvider>
    );
  }
}

export default App;
