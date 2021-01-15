import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebaseApp from '../firebase';

//Material UI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const db = firebaseApp.firestore();

const styles = {
    textField: {
        marginTop: '30px'
    },
    button: {
        margin: '20px 0 20px auto'
    }
}



class EditProfile extends Component {

	constructor(props) {
		super(props);

		this.state = {
			userID: this.props.currentUserID,
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			bio: "",
			education: "",
			location: ""
		};
	}


	//Fetch user info from Cloud Firestore
	async getUserInfo() {
		await db.collection("users").doc(this.state.userID).get()
			.then((u) =>{
				const data = u.data();
				this.setState({
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					phone: data.phone,
					bio: data.bio,
					education: data.education,
					location: data.location,
				})
			})
			.catch((err) => {
				console.log(err);
			})
	}



	componentDidMount(){
		this.getUserInfo();
	}



	//Update user document in Cloud Firestore
	async updateUserInfo() {
		await db.collection("users").doc(this.state.userID).set(this.state)
			.then((u) => this.props.history.push("/user/" + this.state.userID))
			.catch((err) => {
				console.log(err);
			});
	}



	handleSubmit = (event) => {
        event.preventDefault();
        this.updateUserInfo();
    }



	handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };



	render() {
		const { classes } = this.props;

		return (
			<Grid container>
				<Grid item sm={2}></Grid>
				<Grid item sm={8}>
					<h1>Edit Profile</h1>
					<Card>
						<CardContent>
							<Typography variant="body1">
								First name: {this.state.firstName}
							</Typography>
							<Typography variant="body1" className={classes.textField}>
								Last name: {this.state.lastName}
							</Typography>
							<Typography variant="body1" className={classes.textField}>
								Email: {this.state.email}
							</Typography>
							<form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    label="Phone Number"
                                    className={classes.textField}
                                    variant="outlined"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                />

                                <TextField
                                    id="bio"
                                    name="bio"
                                    type="text"
                                    label="Bio"
                                    className={classes.textField}
                                    variant="outlined"
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    multiline={true}
                                    fullWidth
                                />

                                <TextField
                                    id="education"
                                    name="education"
                                    type="text"
                                    label="Education"
                                    className={classes.textField}
                                    variant="outlined"
                                    value={this.state.education}
                                    onChange={this.handleChange}
                                />
                                <br />

                                <TextField
                                    id="location"
                                    name="location"
                                    type="text"
                                    label="Location"
                                    className={classes.textField}
                                    variant="outlined"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                />

                                <br />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Update Profile
                                </Button>
                            </form>
						</CardContent>
					</Card>
				</Grid>
				<Grid item sm={2}></Grid>
			</Grid>
		)
	}
}


export default withRouter(withStyles(styles)(EditProfile))