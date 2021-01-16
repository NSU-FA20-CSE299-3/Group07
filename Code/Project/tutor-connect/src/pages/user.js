import React, { Component } from 'react';
import firebaseApp from '../firebase';
import OfferPost from '../components/OfferPost';
import { Link } from 'react-router-dom';

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar'
import withStyles from '@material-ui/styles/withStyles';

const db = firebaseApp.firestore();

const styles = {
	userInfo: {
		marginTop: "20px",
		marginLeft: "10px"
	},
	button: {
		margin: "20px"
	},
	avatar: {
		width: "75px",
		height: "75px",
		margin: "auto"
	}
}

class User extends Component {

	constructor(props){
		super(props);

		this.state = {
			user: {},
			userID: this.props.match.params.userID,
			userInfo: {},
			offers: []
		}

		let mounted;
	}

	componentDidMount() {
		this.mounted = true;
		this.getUserInfo();
		this.authListener();
		this.getUserOffers();
	}


	componentWillUnmount() {
		this.mounted = false;
	}


	authListener() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      }
      else {
        this.setState({user: null})
      }
    });
  }



	//Fetch user information from Firestore
	async getUserInfo() {
		await db.collection("users").doc(this.state.userID).get()
			.then((querySnapshot) => {this.setState({userInfo: querySnapshot.data()})})
			.catch(err => console.log(err));
	}

	//Fetch user offers from Firestore
	async getUserOffers() {
		await db.collection("offers").where("userID","==", this.state.userID).get()
			.then((querySnapshot) => {
                const offersSet = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.offerID = doc.id;
                    return data;
                });

                if (this.mounted) {
                	this.setState({offers: offersSet});
            	}
			})
			.catch(err => console.log(err));

	}

	render() {

		const { classes } = this.props;

        let userOffers = this.state.offers.map((offer) => {if (offer) { 
                return (
                	<OfferPost key={offer.offerID} offer={offer} currentUser={this.state.user} />
                );}
                else {return null}
            });

		return (
			<Grid container>
				<Grid item sm={6} xs={12}>
					<h1>User Info</h1>
					<Card className="card">
                        <CardContent>
                        	<Grid container>
	                        	<Grid item sm></Grid>
	                        	<Grid item sm>
	                        		<Avatar className={classes.avatar}>
                        				{this.state.userInfo.firstName ? this.state.userInfo.firstName.charAt(0) : "..."}
                        			</Avatar>
	                        	</Grid>
	                        	<Grid item sm></Grid>
                        	</Grid>
                        	<Typography variant="h4" component="h2" color="primary" align="center">
                                {this.state.userInfo.firstName} {this.state.userInfo.lastName}
                            </Typography>
                            <br />
                            <Typography variant="body1" component="p" className={classes.userInfo}>
                                Bio: {this.state.userInfo.bio}
                            </Typography>
                            <Typography variant="body1" component="p" className={classes.userInfo}>
                                Education: {this.state.userInfo.education}
                            </Typography>
                            <Typography variant="body1" component="p" className={classes.userInfo}>
                                Email: {this.state.userInfo.email}
                            </Typography>
                            <Typography variant="body1" component="p" className={classes.userInfo}>
                                Phone: {this.state.userInfo.phone}
                            </Typography>
                            <Typography variant="body1" component="p" className={classes.userInfo}>
                                Location: {this.state.userInfo.location}
                            </Typography>
                        </CardContent>
                    </Card>

                    {(this.state.user && (this.state.user.uid === this.state.userID)) ? 
                    	(<Button color="primary" 
                    		component={Link} 
                    		to="/edit-profile" 
                    		className={classes.button}
                    		>Edit Profile</Button>) : null}

				</Grid>
				<Grid item sm={1} xs={12}></Grid>
				<Grid item sm={5} xs={12}>
					<h1>Offers Posted</h1>
					<div>{userOffers}</div>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(User);