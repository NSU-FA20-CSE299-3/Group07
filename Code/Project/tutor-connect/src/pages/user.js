import React, { Component } from 'react';
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
			userID: this.props.match.params.userID,
			userInfo: {},
			offers: []
		}
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
					<Card className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2" color="primary">
                                This is user: {this.props.match.params.userID}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Profile info will go here!
                            </Typography>
                        </CardContent>
                    </Card>
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