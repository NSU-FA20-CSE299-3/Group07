import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class HomePageCard extends Component {
    render() {
        return (
            <Grid container>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <Card className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2" color="primary">
                                Need a tutor for your child?
                            </Typography>
                            <Typography variant="body2" component="p">
                                Sign up or login to post your tuition openings!
                            </Typography>
                            <Button color="primary" component={Link} to="/login">Login</Button>
                            <Button color="primary" component={Link} to="/signup">Sign Up</Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={2}></Grid>
            </Grid>
        )
    }
}

export default HomePageCard
