import React, { Component } from 'react';
import firebaseApp from '../firebase';


import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


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
        
        const db = firebaseApp.firestore();
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

        const db = firebaseApp.firestore();
        await db.collection("offers").add(postData)
            .then((docRef) => {console.log(docRef)})
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

        return (
            <Grid container >
                <Grid item sm={2} ></Grid>
                <Grid item sm={8} >
                    <Card className="card">
                        <CardContent >
                            <h1>Welcome, {this.state.displayName}!</h1>
                            <Typography variant="h4">Make a New Offer</Typography>
                            <form noValidate onSubmit={this.handleSubmit}>

                                <TextField
                                    id="schoolMedium"
                                    name="schoolMedium"
                                    type="text"
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
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={this.state.duration}
                                    onChange={this.handleChange}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
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


export default NewOfferForm
