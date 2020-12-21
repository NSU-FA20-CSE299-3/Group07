import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

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
          email: '',
          password: '',
          confirmPassword: '',
          username: '',
          errors: {}
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          username: this.state.username
        };

        console.log(userData);
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

                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        className={classes.textField}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        fullWidth
                    />

                    <TextField
                        id="username"
                        name="username"
                        type="text"
                        label="Username"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange}
                        fullWidth
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

export default withStyles(styles)(Signup)
