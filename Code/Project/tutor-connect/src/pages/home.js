import React, { Component } from 'react';
import OfferPost from '../components/OfferPost';
import Grid from '@material-ui/core/Grid';
import firebaseApp from '../firebase';

import NewOfferForm from '../components/NewOfferForm';
import HomePageCard from '../components/HomePageCard';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            user: {},
            mounted: false
        }

        let mounted;
    }


    componentDidMount() {
        this.authListener();
        this.mounted = true;
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


    //Fetch recent offers from Firestore
    async getRecentOffers() {
        const db = firebaseApp.firestore();
        await db.collection("offers").get()
            .then((querySnapshot) => {
                const offersSet = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.offerID = doc.id;
                    return data;
                });
                if(this.mounted) {
                    this.setState({offers: offersSet});
                }
            })
            .catch((err) => {console.log(err)});
    }


    render() {
        this.getRecentOffers();
        let recentOffers = this.state.offers.map((offer) => {if (offer) { 
                return (<OfferPost key={offer.offerID} offer={offer} currentUser={this.state.user} />);}
                else {return null}
            });

        return (
            <Grid container>
                <Grid item sm={6} xs={12}>
                    <h1>Home Page</h1>
                    <div>{recentOffers}</div>
                </Grid>
                <Grid item sm={6} xs={12}>
                    {this.state.user ? (<NewOfferForm currentUserID={this.state.user.uid} />) : (<HomePageCard />)}
                </Grid>

            </Grid>
        )
    }
}

export default Home
