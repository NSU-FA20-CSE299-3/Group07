import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase';

//Material UI Components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    navButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold'
    }

});

class Navbar extends Component {

    async logout() {
        await firebaseApp.auth().signOut();

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
            <AppBar>
                <Toolbar>

                    

                    <Button color="inherit" component={Link} to="/" className={classes.navButton}>Home</Button>

                    <Typography align='center' className={classes.title} >Tutor Connect</Typography>

                    {this.props.currentUser ? 
                        (<Button color="inherit" onClick={this.logout} className={classes.navButton}>Logout</Button>):
                        (<Button color="inherit" component={Link} to="/login" className={classes.navButton}>Login</Button>)
                    }

                    {this.props.currentUser ? 
                        (<Button color="inherit" component={Link} to={`/user/${this.props.currentUser.uid}`} className={classes.navButton}>Profile</Button>) :
                        (<Button color="inherit" component={Link} to="/signup" className={classes.navButton}>Signup</Button>)
                    }
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Navbar)
