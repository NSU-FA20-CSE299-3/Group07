import React, { Component } from 'react';
import firebaseApp from '../firebase';

//Material UI Components
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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


	async getUserInfo() {
		const db = firebaseApp.firestore();
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



	handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

	render() {
		return (
			<Grid container>
				<Grid item sm={2}></Grid>
				<Grid item sm={8}>
					<h1>Edit Profile</h1>
					<Card>
						<CardContent>
							<form noValidate onSubmit={this.handleSubmit}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    label="Phone Number"
                                    variant="outlined"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="bio"
                                    name="bio"
                                    type="text"
                                    label="Bio"
                                    variant="outlined"
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    fullWidth
                                />

                                <TextField
                                    id="education"
                                    name="education"
                                    type="text"
                                    label="Education"
                                    variant="outlined"
                                    value={this.state.education}
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

                                <br />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
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


export default EditProfile