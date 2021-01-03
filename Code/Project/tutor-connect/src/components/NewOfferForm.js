import React, { Component } from 'react';
import firebaseApp from '../firebase';


import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
    textField: {
        marginTop: '20px'
    },
    button: {
        margin: '20px 0 20px auto'
    }
}

const db = firebaseApp.firestore();


class NewOfferForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            schoolMedium: '',
            schoolClass: '',
            description: '',
            location: '',
            salary: 0,
            duration: 0
        }   
    }


    async setUserDisplayName(id) {
        const snapshot = await db.collection("users").doc(id).get();
        const data = snapshot.data();
        const firstName = data.firstName;
        const lastName = data.lastName;
        const displayName = firstName.concat(' ', lastName);
        this.setState({displayName: displayName});
        return;
    }


    async postNewOffer() {
        const postData = {
            userID: this.props.currentUserID,
            displayName: this.state.displayName,
            schoolMedium: this.state.schoolMedium,
            schoolClass: this.state.schoolClass,
            description: this.state.description,
            location: this.state.location,
            salary: this.state.salary,
            duration: this.state.duration,
            answerCount: 0
        }

        let currentOfferID = '';

        await db.collection("offers").add(postData)
            .then((docRef) => {
                currentOfferID = docRef.id;
                this.setState = ({
                    schoolMedium: '',
                    schoolClass: '',
                    description: '',
                    location: '',
                    salary: 0,
                    duration: 0
                });
            })
            .catch((err) => {console.log(err)});

        await db.collection("offers").doc(currentOfferID)
            .update({offerID: currentOfferID})
            .catch((err) => {console.log(err)});
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.postNewOffer();
    }


    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    render() {
        if(this.state.displayName === '' && this.props.currentUserID) {
            this.setUserDisplayName(this.props.currentUserID);
        }

        const { classes } = this.props;

        return (
            <Grid container >
                <Grid item sm={2} ></Grid>
                <Grid item sm={8} >
                    <h1>Welcome, {this.state.displayName}!</h1>
                    <Card className="card">
                        <CardContent >
                            <Typography variant="h6">Make a New Offer</Typography>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="schoolMedium"
                                    name="schoolMedium"
                                    type="text"
                                    className={classes.textField}
                                    label="Medium"
                                    variant="outlined"
                                    value={this.state.schoolMedium}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="schoolClass"
                                    name="schoolClass"
                                    type="text"
                                    className={classes.textField}
                                    label="Class"
                                    variant="outlined"
                                    value={this.state.schoolClass}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="description"
                                    name="description"
                                    type="text"
                                    className={classes.textField}
                                    label="Description"
                                    variant="outlined"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="location"
                                    name="location"
                                    type="text"
                                    className={classes.textField}
                                    label="Location"
                                    variant="outlined"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="salary"
                                    label="Salary"
                                    name="salary"
                                    className={classes.textField}
                                    type="number"
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.salary}
                                    onChange={this.handleChange}
                                />

                                <TextField
                                    id="duration"
                                    label="Duration"
                                    name="duration"
                                    type="number"
                                    className={classes.textField}
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.duration}
                                    onChange={this.handleChange}
                                />
                                <br />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Post
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={2} ></Grid>
            </Grid>
        )
    }
}


export default withStyles(styles)(NewOfferForm)
