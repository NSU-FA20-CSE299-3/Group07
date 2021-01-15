import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => ({
    card: {
        marginTop: '90px',
    },
    title: {
        marginBottom: '20px',
    },
    media: {

    },
    loginButton: {
        marginRight: '15%',
        marginLeft: '15%'
    },
    signupButton: {
        marginRight: '15%',
        marginLeft: '15%'
    },
    buttons: {
        flexGrow: 1,
    }
});


class HomePageCard extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h2" color="primary" align="center" className={classes.title}>
                                Need a tutor for your child?
                            </Typography>
                            <Typography variant="h5" component="h2" color="primary" align="center" className={classes.title}>
                                Want to apply to the offers you see?
                            </Typography>

                            <CardMedia
                                image="/public/tutor-student.png"
                                title="Tutor and student"
                            />
                            <Typography variant="body1" component="p" align="center" >
                                Sign up or login to post your tuition openings!
                            </Typography>
                            <div className={classes.buttons}>
                            <Button color="primary" component={Link} to="/login" className={classes.loginButton}>Login</Button>
                            <Button color="primary" component={Link} to="/signup" className={classes.signupButton}>Sign Up</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={2}></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(HomePageCard)
