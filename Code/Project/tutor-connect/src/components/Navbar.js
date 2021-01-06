import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


class Navbar extends Component {

    async logout() {
        await firebaseApp.auth().signOut();

    }

    render() {
        return (
            <AppBar>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Home</Button>

                    {this.props.currentUser ? 
                        (<Button color="inherit" onClick={this.logout}>Logout</Button>):
                        (<Button color="inherit" component={Link} to="/login">Login</Button>)
                    }

                    {this.props.currentUser ? 
                        (<Button color="inherit" component={Link} to={`/user/${this.props.currentUser.uid}`}>Profile</Button>) :
                        (<Button color="inherit" component={Link} to="/signup">Signup</Button>)
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
