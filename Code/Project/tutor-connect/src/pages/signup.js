import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import firebaseApp from '../firebase';

//Material UI Components
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const styles = {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        textAlign: 'center'
    },
    textField: {
        marginTop: '20px'
    },
    button: {
        margin: '20px auto 20px auto'
    }
}

class Signup extends Component {
    constructor() {
        super();
        this.state = {
          firstName: '',
          lastName:'',  
          email: '',
          password: '',
          confirmPassword: '',
          errors: ''
        };
    }


    //Add user to Firebase Authentication
    async addUserToDatabase(userID) {
        const db = firebaseApp.firestore();

        const userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,  
            email: this.state.email,
            password: this.state.password,
            userID: userID,
            bio: "",
            education: "",
            location: "",
            phone: ""
        };

        await db.collection("users").doc(userID).set(userData)
            .then((u) => this.props.history.push("/"));
    }



    //Add user document to Cloud Firestore
    async addUserToAuth() {
        const db = firebaseApp.firestore();

        await firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                this.addUserToDatabase(u.user.uid);
            })
            .catch((err) => {
                this.setState({errors: err.message});
            });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.password !== this.state.confirmPassword) {
            this.setState({errors: "Passwords do not match."})
        } else {
            this.addUserToAuth();
        }
    };



    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };



    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item sm></Grid>
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="First Name"
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            id="lastName"
                            name="lastName"
                            type="text"
                            label="Last Name"
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />
                    
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Sign Up
                        </Button>

                        <br />
                        <Typography variant="body1" color="error">{this.state.errors}</Typography>
                        <small>
                            Already have an account? <Link to="/login">Login here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm></Grid>  
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(Signup))
