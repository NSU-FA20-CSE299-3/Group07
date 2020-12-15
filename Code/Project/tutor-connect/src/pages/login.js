import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'


class Login extends Component {
    render() {
        return (
            <Grid container>
                <Grid item sm></Grid>
                <Grid item sm>
                    <form noValidate className="loginForm">
                        <h2>Login</h2>
                        <div className="formTextField">
                            <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                defaultValue="Hello World"
                                variant="outlined"
                            />
                        </div>
                        <div className="formTextField">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                            />
                        </div>
                        <Button variant="contained" color="primary">Login</Button>
                    </form>
                </Grid>
                <Grid item sm></Grid>  
            </Grid>
        )
    }
}

export default Login