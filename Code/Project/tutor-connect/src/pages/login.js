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

class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          errors: ''
        };
    }


    //Firebase Login Authentication
    async login(email, password) {
        this.setState({errors: ''});
        await firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((u) => this.props.history.push("/"))
            .catch((err) => {
                if (err.code === "auth/wrong-password") {
                    this.setState({errors: "Password is invalid."})
                } else {
                    this.setState({errors: err.message})
                }
            });
    }



    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password
        };

        this.login(userData.email, userData.password);
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
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
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
                        />
                        
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Login
                        </Button>

                        <br />
                        <Typography variant="body1" color="error">{this.state.errors}</Typography>
                        <small>
                          dont have an account ? sign up <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm></Grid>  
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(Login))