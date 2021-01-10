import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase';
import OfferPost from '../components/OfferPost';

//Material UI Components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const db = firebaseApp.firestore();

class User extends Component {

	constructor(props){
		super(props);

		this.state = {
			user: {},
			userID: this.props.match.params.userID,
			userInfo: {},
			offers: []
		}
	}

	componentDidMount() {
		this.getUserInfo();
		this.authListener();
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
                this.setState({offers: offersSet});
			})
			.catch(err => console.log(err));

	}

	render() {
		this.getUserOffers();
        let userOffers = this.state.offers.map((offer) => {if (offer) { 
                return (<OfferPost key={offer.offerID} offer={offer} currentUser={this.state.user} />);}
            });

		return (
			<Grid container>
				<Grid item sm={6} xs={12}>
					<h1>User Info</h1>
					<Card className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2" color="primary">
                                This is user: {this.state.userInfo.firstName} {this.state.userInfo.lastName}
                            </Typography>
                            <br />
                            <Typography variant="body2" component="p">
                                Bio: {this.state.userInfo.bio}
                                <br />
                                Education: {this.state.userInfo.education}
                                <br />
                                Email: {this.state.userInfo.email}
                                <br />
                                Phone: {this.state.userInfo.phone}
                            </Typography>
                        </CardContent>
                    </Card>

                    {(this.state.user && (this.state.user.uid === this.state.userID)) ? 
                    	(<Link to="/edit-profile" underline="hover" color="primary">Edit Profile</Link>) : null}

                    <Typography></Typography>
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

export default User;